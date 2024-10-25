// src/controllers/cardController.ts
import { Request, Response } from 'express';
import { CardService } from '../services/cardService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CardController {
    // Método para criar um cartão associado a uma conta
    public async createCard(req: Request, res: Response): Promise<Response> {
        const params = { ...req.body, accountId: req.params.accountId };

        try {
            // Verifica se a conta existe
            const account = await prisma.account.findUnique({
                where: { id: params.accountId },
            });
            if (!account) {
                return res.status(404).json({ message: 'Conta não encontrada.' });
            }

            // Cria o cartão associado à conta
            const card = await prisma.card.create({
                data: {
                    type: params.type,
                    number: params.number,
                    cvv: params.cvv,
                    accountId: params.accountId,
                },
            });

            return res.status(201).json(card);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Erro ao criar cartão.',
            });
        }
    }

    // Método para listar todos os cartões de um usuário com paginação opcional
    public async getCards(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.body.user?.id;

            if (!userId) {
                return res.status(401).json({ message: 'Usuário não autenticado.' });
            }

            // Parametros de paginação opcionais
            const { itemsPerPage = 10, currentPage = 1 } = req.query;
            const parsedItemsPerPage = parseInt(itemsPerPage as string, 10);
            const parsedCurrentPage = parseInt(currentPage as string, 10);

            const cards = await CardService.getCardsByUserId(userId, parsedItemsPerPage, parsedCurrentPage);

            return res.status(200).json(cards);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Erro ao listar os cartões.',
            });
        }
    }
}

export default CardController;

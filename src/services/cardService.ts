// src/services/cardService.ts
import { PrismaHelper } from '../config/prisma-helper';

export class CardService {
    // Método para listar cartões de um usuário com paginação
    public static async getCardsByUserId(userId: string, itemsPerPage: number, currentPage: number): Promise<any> {
        const client = PrismaHelper.getClient();

        const skip = (currentPage - 1) * itemsPerPage;
        const take = itemsPerPage;

        const cards = await client.card.findMany({
            where: {
                account: {
                    personId: userId, 
                },
            },
            skip,
            take,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                type: true,
                number: true,
                cvv: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        // Formatar número para exibir somente os 4 últimos dígitos
        const formattedCards = cards.map(card => ({
            ...card,
            number: card.number.slice(-4), 
        }));

        return {
            cards: formattedCards,
            pagination: {
                itemsPerPage,
                currentPage,
            },
        };
    }
}

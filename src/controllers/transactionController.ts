import { Request, Response } from 'express';
import TransactionService from '../services/transactionService';

class TransactionController {
    // Método para criar uma transação (débito/crédito)
    public async createTransaction(req: Request, res: Response): Promise<Response> {
        const { value, description } = req.body;
        const accountId = req.params.accountId;

        try {
            const transaction = await TransactionService.createTransaction(
                accountId,
                value,
                description
            );

            return res.status(201).json(transaction);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Erro ao criar transação.',
            });
        }
    }

    // Método para criar uma transferência interna
    public async createInternalTransaction(req: Request, res: Response): Promise<Response> {
        const { receiverAccountId, value, description } = req.body;
        const accountId = req.params.accountId;

        try {
            const transaction = await TransactionService.createInternalTransaction(
                accountId,
                receiverAccountId,
                value,
                description
            );

            return res.status(201).json(transaction);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Erro ao criar transação interna.',
            });
        }
    }

    // Método para listar transações por accountId com paginação
    public async getTransactionsByAccountId(req: Request, res: Response): Promise<Response> {
        const accountId = req.params.accountId;
        const { itemsPerPage = 10, currentPage = 1, type } = req.query;

        try {
            const transactions = await TransactionService.getTransactionsByAccountId(
                accountId,
                Number(itemsPerPage),
                Number(currentPage),
                type as string | undefined
            );

            return res.status(200).json(transactions);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Erro ao listar transações.',
            });
        }
    }

    // Método para reverter uma transação
    public async revertTransaction(req: Request, res: Response): Promise<Response> {
        const accountId = req.params.accountId;
        const transactionId = req.params.transactionId;

        try {
            const transaction = await TransactionService.revertTransaction(accountId, transactionId);
            return res.status(200).json(transaction); // Retorna a transação de reversão criada
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Erro ao reverter transação.',
            });
        }
    }
}

export default TransactionController;

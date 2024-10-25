import { Request, Response } from 'express';
import { AccountService } from '../services/accountService';

class AccountController {
    public async createAccount(req: Request, res: Response): Promise<Response> {
        try {
            const { branch, account } = req.body;
            const userId = req.body.user?.id;

            if (!userId) {
                return res.status(401).json({ message: 'Usuário não autenticado.' });
            }

            const newAccount = await AccountService.createAccount({ branch, account, userId });

            return res.status(201).json(newAccount);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            } else {
                return res.status(500).json({
                    message: 'Erro ao criar a conta.',
                });
            }
        }
    }

    public async getAccounts(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.body.user?.id;

            if (!userId) {
                return res.status(401).json({ message: 'Usuário não autenticado.' });
            }

            const accounts = await AccountService.getAccountsByUserId(userId);
            return res.status(200).json(accounts);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            } else {
                return res.status(500).json({
                    message: 'Erro ao listar as contas.',
                });
            }
        }
    }

    public async getCards(req: Request, res: Response): Promise<Response> {
        try {
            const { accountId } = req.params;
            const cards = await AccountService.getCardsByAccountId(accountId);

            return res.status(200).json(cards);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            } else {
                return res.status(500).json({
                    message: 'Erro ao listar os cartões.',
                });
            }
        }
    }

    // Método para obter o saldo de uma conta
    public async getBalance(req: Request, res: Response): Promise<Response> {
        const accountId = req.params.accountId;

        try {
            const balance = await AccountService.getBalanceByAccountId(accountId);
            return res.status(200).json({ balance: parseFloat(balance.toFixed(2)) });
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Erro ao obter saldo.',
            });
        }
    }
}

export default AccountController;

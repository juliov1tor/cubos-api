// src/routes/accountRoutes.ts

import { Router, Request, Response } from 'express';
import PersonController from '../controllers/personController';
import AccountController from '../controllers/accountController';
import CardController from '../controllers/cardController';
import TransactionController from '../controllers/transactionController'; 
import { authMiddleware, complianceMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const personController = new PersonController();
const accountController = new AccountController();
const cardController = new CardController();
const transactionController = new TransactionController();

// Endpoint para criar uma pessoa
router.post('/people', complianceMiddleware, (req: Request, res: Response) => personController.createPerson(req, res));

// Endpoint para criar uma conta, protegido com o middleware de autenticação
router.post('/accounts', authMiddleware, (req: Request, res: Response) => {
    accountController.createAccount(req, res);
});

// Endpoint para listar todas as contas de um usuário
router.get('/accounts', authMiddleware, (req: Request, res: Response) => {
    accountController.getAccounts(req, res);
});

// Endpoint para criar um cartão em uma conta
router.post('/accounts/:accountId/cards', authMiddleware, (req: Request, res: Response) => {
    cardController.createCard(req, res);
});

// Endpoint para listar todos os cartões de uma conta
router.get('/accounts/:accountId/cards', authMiddleware, (req: Request, res: Response) => {
    cardController.getCards(req, res);
});

// Endpoint para criar uma transação (débito/crédito)
router.post('/accounts/:accountId/transactions', authMiddleware, (req: Request, res: Response) => {
    transactionController.createTransaction(req, res);
});

// Endpoint para criar uma transferência interna
router.post('/accounts/:accountId/transactions/internal', authMiddleware, (req: Request, res: Response) => {
    transactionController.createInternalTransaction(req, res);
});

// Endpoint para listar todas as transações de uma conta com paginação
router.get('/accounts/:accountId/transactions', authMiddleware, (req: Request, res: Response) => {
    transactionController.getTransactionsByAccountId(req, res);
});

// Endpoint para reverter uma transação
router.post('/accounts/:accountId/transactions/:transactionId/reverse', authMiddleware, (req: Request, res: Response) => {
    transactionController.revertTransaction(req, res);
});

// Endpoint para obter o saldo de uma conta
router.get('/accounts/:accountId/balance', authMiddleware, (req: Request, res: Response) => {
    accountController.getBalance(req, res);
});

export default router;

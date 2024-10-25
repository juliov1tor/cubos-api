"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accountService_1 = require("../services/accountService");
class AccountController {
    async createAccount(req, res) {
        try {
            const { branch, account } = req.body;
            const user = req.user;
            if (!user) {
                return res.status(401).json({ message: 'Usuário não autenticado.' });
            }
            const newAccount = await accountService_1.AccountService.createAccount({ branch, account, userId: user.id });
            return res.status(201).json(newAccount);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
            else {
                return res.status(500).json({
                    message: 'Erro ao criar a conta.',
                });
            }
        }
    }
}
exports.default = AccountController;

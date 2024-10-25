"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const accountModel_1 = require("../model/accountModel");
class AccountService {
    static async createAccount({ branch, account, userId }) {
        // Validação do formato da agência (branch)
        if (!/^\d{3}$/.test(branch)) {
            throw new Error('A agência deve possuir exatos 3 dígitos.');
        }
        // Validação do formato da conta (account)
        if (!/^\d{7}-\d{1}$/.test(account)) {
            throw new Error('A conta deve estar no formato XXXXXXX-X.');
        }
        // Verificar se a conta já existe
        const existingAccount = await accountModel_1.Account.findOne({ where: { account } });
        if (existingAccount) {
            throw new Error('O número da conta já existe.');
        }
        // Criar nova conta
        const newAccount = await accountModel_1.Account.create({
            branch,
            account,
            userId, // Relaciona a conta com a pessoa autenticada
        });
        return newAccount;
    }
}
exports.AccountService = AccountService;

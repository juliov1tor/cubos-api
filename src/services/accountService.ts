// src/services/accountService.ts

import { PrismaHelper } from '../config/prisma-helper';
import { Card } from '../model/cardModel'; // Importe seu modelo de cartão

interface AccountData {
    branch: string;
    account: string;
    userId: string;
}

export class AccountService {
    public static async createAccount({ branch, account, userId }: AccountData): Promise<any> {
        const client = PrismaHelper.getClient();
        // Validação do formato da agência (branch)
        if (!/^\d{3}$/.test(branch)) {
            throw new Error('A agência deve possuir exatos 3 dígitos.');
        }

        // Validação do formato da conta (account)
        if (!/^\d{7}-\d{1}$/.test(account)) {
            throw new Error('A conta deve estar no formato XXXXXXX-X.');
        }

        //Verificar se a conta já existe
        const existingAccount = await client.account.findFirst({ where: { account } });
        if (existingAccount) {
            throw new Error('O número da conta já existe.');
        }

        //Criar nova conta
        const newAccount = await client.account.create({
            data: {
                branch,
                account,
                person: {
                    connect: { id: userId }
                }
            }
        });

        return newAccount;
    }

    public static async getAccountsByUserId(userId: string): Promise<any[]> {
        const client = PrismaHelper.getClient();
        const accounts = await client.account.findMany({
            where: {
                personId: userId,
            }
        });
        return accounts;
    }

    public static async getCardsByAccountId(accountId: string): Promise<any[]> {
        const client = PrismaHelper.getClient();
        const cards = await client.card.findMany({
            where: {
                accountId, // Corrigido para buscar pelo accountId
            },
            include: {
                account: true,
            }
        });

        return cards;
    }

    // Método para obter o saldo de uma conta
    public static async getBalanceByAccountId(accountId: string): Promise<number> {
        const client = PrismaHelper.getClient();
        const account = await client.account.findUnique({
            where: { id: accountId },
            select: { balance: true },
        });

        if (!account) {
            throw new Error('Conta não encontrada.');
        }

        return account.balance; // Retorna o saldo
    }
}

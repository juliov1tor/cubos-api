import { PrismaClient, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

class TransactionService {
    // Método para criar uma transação
    public static async createTransaction(
        accountId: string,
        value: number,
        description: string
    ): Promise<any> {
        // Valida o saldo da conta
        const account = await prisma.account.findUnique({
            where: { id: accountId },
            select: { balance: true },
        });

        if (!account) {
            throw new Error('Conta não encontrada.');
        }

        // Verifica se há saldo suficiente para débito
        if (value < 0 && account.balance + value < 0) {
            throw new Error('Saldo insuficiente para realizar a transação de débito.');
        }

        // Cria a transação
        const transaction = await prisma.transaction.create({
            data: {
                value,
                description,
                type: value < 0 ? 'debit' : 'credit',
                accountId,
            },
        });

        // Atualiza o saldo da conta
        const newBalance = account.balance + value;
        await prisma.account.update({
            where: { id: accountId },
            data: { balance: newBalance },
        });

        return transaction; 
    }

    // Método para criar uma transação interna
    public static async createInternalTransaction(
        accountId: string,
        receiverAccountId: string,
        value: number,
        description: string
    ): Promise<any> {
        // Valida se as contas são diferentes
        if (accountId === receiverAccountId) {
            throw new Error('A conta de origem e a conta de destino devem ser diferentes.');
        }

        // Valida o saldo da conta de origem
        const sourceAccount = await prisma.account.findUnique({
            where: { id: accountId },
            select: { balance: true },
        });

        if (!sourceAccount) {
            throw new Error('Conta de origem não encontrada.');
        }

        // Verifica se há saldo suficiente
        if (sourceAccount.balance < value) {
            throw new Error('Saldo insuficiente para realizar a transferência.');
        }

        // Verifica se a conta de destino existe
        const receiverAccount = await prisma.account.findUnique({
            where: { id: receiverAccountId },
        });

        if (!receiverAccount) {
            throw new Error('Conta de destino não encontrada.');
        }

        // Cria a transação de débito na conta de origem
        const debitTransaction = await prisma.transaction.create({
            data: {
                value: -value,
                description,
                type: 'debit',
                accountId: accountId, 
                receiverAccountId: receiverAccountId,
            },
        });

        // Atualiza o saldo da conta de origem
        await prisma.account.update({
            where: { id: accountId },
            data: { balance: { decrement: value } },
        });

        // Cria a transação de crédito na conta de destino
        const creditTransaction = await prisma.transaction.create({
            data: {
                value, 
                description,
                type: 'credit',
                accountId: receiverAccountId, 
            },
        });

        // Atualiza o saldo da conta de destino
        await prisma.account.update({
            where: { id: receiverAccountId },
            data: { balance: { increment: value } },
        });

        return creditTransaction; 
    }

    // Método para obter transações por accountId com paginação
    public static async getTransactionsByAccountId(
        accountId: string,
        itemsPerPage = 10,
        currentPage = 1,
        type?: string
    ): Promise<{ transactions: any[], pagination: { itemsPerPage: number, currentPage: number, total: number } }> {
        const where: any = {
            accountId,
        };

        if (type) {
            where.type = type as TransactionType;
        }

        const transactions = await prisma.transaction.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        });

        const totalTransactions = await prisma.transaction.count({ where });

        return {
            transactions,
            pagination: {
                itemsPerPage,
                currentPage,
                total: totalTransactions,
            },
        };
    }

    // Método para reverter uma transação
    public static async revertTransaction(accountId: string, transactionId: string): Promise<any> {
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
        });

        if (!transaction) {
            throw new Error('Transação não encontrada.');
        }

        // Verifica se a transação já foi revertida
        const reversalExists = await prisma.transactionReversal.findUnique({
            where: { originalTransactionId: transactionId },
        });

        if (reversalExists) {
            throw new Error('A transação já foi revertida.');
        }

        // Valida o saldo da conta para a reversão
        const account = await prisma.account.findUnique({
            where: { id: accountId },
            select: { balance: true },
        });

        if (!account) {
            throw new Error('Conta não encontrada.');
        }

        const isCredit = transaction.type === 'credit';
        const valueToRevert = isCredit ? -transaction.value : transaction.value;

        // Verifica se há saldo suficiente para a reversão
        if (isCredit && account.balance + valueToRevert < 0) {
            throw new Error('Saldo insuficiente para realizar a reversão.');
        }

        // Cria a nova transação de reversão
        const reversedTransaction = await prisma.transaction.create({
            data: {
                value: valueToRevert,
                description: `Estorno de ${transaction.description}`,
                type: isCredit ? 'debit' : 'credit',
                accountId,
            },
        });

        // Atualiza o saldo da conta
        const newBalance = account.balance + valueToRevert;
        await prisma.account.update({
            where: { id: accountId },
            data: { balance: newBalance },
        });

        // Cria o relacionamento de reversão entre as transações
        await prisma.transactionReversal.create({
            data: {
                originalTransactionId: transactionId,
                reversedTransactionId: reversedTransaction.id,
            },
        });

        return reversedTransaction;
    }
}

export default TransactionService;

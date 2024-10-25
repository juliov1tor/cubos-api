import { PrismaHelper } from './prisma-helper';

export const connect = async (): Promise<void> => {
    try {
        await PrismaHelper.connect(process.env.PG_URL);
        console.log('Successfully connected to the database.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Encerra o processo se não for possível conectar ao banco de dados
    }
}

export const disconnect = async (): Promise<void> => {
    try {
        await PrismaHelper.disconnect();
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Encerra o processo se não for possível conectar ao banco de dados
    }
}
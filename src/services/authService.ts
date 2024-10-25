import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaHelper } from '../config/prisma-helper';

export class AuthService {
    public static async authenticate(document: string, password: string): Promise<string> {
        const client = PrismaHelper.getClient();
        // Busca a conta pelo documento
        const account = await client.person.findUnique({ where: { document } });
        if (!account) {
            throw new Error('Usuário não encontrado.');
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, account.password);
        if (!isPasswordValid) {
            throw new Error('Senha inválida.');
        }

        // Gera um token JWT
        const token = jwt.sign(
            { id: account.id, document: account.document }, // Payload
            'secret',  // Chave secreta (use uma variável de ambiente em produção)
            { expiresIn: '1h' }  // Expiração do token
        );

        return token;
    }
}

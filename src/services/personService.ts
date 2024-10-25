import bcrypt from 'bcrypt';
import { PrismaHelper } from '../config/prisma-helper';

export class PersonService {
    
    

    public static async createPerson(personData: any): Promise<any> {
        const client = PrismaHelper.getClient();

        // Verificar se a pessoa já existe com o documento fornecido
        const existingPerson = await client.person.findFirst({
            where: {
                document: personData.document,
            },
        });

        if (existingPerson) {
            throw new Error('Document already exists');
        }

        // Criptografando a senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(personData.password, 10);
        personData.password = hashedPassword;

        // Criando nova pessoa no banco de dados
        const newPerson = await client.person.create({
            data: {
                name: personData.name,
                document: personData.document,
                password: personData.password
            }
        });
        return newPerson;
    }
}

import axios from 'axios';
import { PrismaHelper } from '../config/prisma-helper';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export class ComplianceService {
    public static async getAuthCode(login: string, password: string): Promise<any> {
        const client = PrismaHelper.getClient();
        try {
            // const existingData = await client.complianceData.findFirst({
            //     orderBy: { createdAt: 'desc' },
            // });
            // // Se já existir um authCode válido, retorna ele
            // if (existingData && existingData.authCode) {
            //     const responseAcessToken = await axios.post('https://compliance-api.cubos.io/auth/token', {
            //         refreshToken: existingData.refreshToken,
            //     }, {
            //         headers: {
            //             'accept': 'application/json',
            //             'Content-Type': 'application/json',
            //         },
            //     });
            //     const complianceData = await client.complianceData.update({
            //         where: { id: existingData.id },
            //         data: {
            //             userId: existingData.userId,
            //             authCode: existingData.authCode,
            //             idToken: existingData.idToken,
            //             accessToken: responseAcessToken.data.accessToken,
            //             refreshToken: existingData.refreshToken
            //         },
            //     });
            //     return {
            //         message: 'AuthCode already exists',
            //         payload: complianceData,
            //     };
            // }
            let upinsert = {
                userId: '',
                authCode: '',
                idToken: '',
                accessToken: '',
                refreshToken: '',
            }
            const responseAuthCode = await axios.post('https://compliance-api.cubos.io/auth/code', {
                email: login,
                password: password,
            }, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            upinsert.userId = responseAuthCode.data.data.userId,
                upinsert.authCode = responseAuthCode.data.data.authCode;

            const responseAcessToken = await axios.post('https://compliance-api.cubos.io/auth/token', {
                authCode: upinsert.authCode,
            }, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            upinsert.idToken = responseAcessToken.data.data.idToken;
            upinsert.accessToken = responseAcessToken.data.data.accessToken;
            upinsert.refreshToken = responseAcessToken.data.data.refreshToken;
            // Insere os dados na tabela ComplianceData
            const complianceData = await client.complianceData.create({
                data: {
                    userId: upinsert.userId,
                    authCode: upinsert.authCode,
                    idToken: upinsert.idToken,
                    accessToken: upinsert.accessToken,
                    refreshToken: upinsert.refreshToken
                },
            });

            return {
                message: 'Authentication successful',
                payload: complianceData,
            };
        } catch (error) {
            return {
                message: 'Authentication failed',
                payload: error
            };
        }
    }

    // Função para validar o documento (CPF ou CNPJ)
    public static async validateDocument(data: any): Promise<boolean> {
        const { document, complianceToken } = data;

        // Remover caracteres especiais do documento (CPF/CNPJ)
        const cleanDocument = document.replace(/[^\d]/g, '');

        let isValid = false;

        // Verificar se o documento é um CPF (11 dígitos) ou CNPJ (14 dígitos)
        try {
            const endpoint = cleanDocument.length === 11
                ? 'https://compliance-api.cubos.io/cpf/validate'
                : cleanDocument.length === 14
                    ? 'https://compliance-api.cubos.io/cnpj/validate'
                    : null;

            if (endpoint) {
                // Valida CPF ou CNPJ localmente
                isValid = cleanDocument.length === 11 ? cpf.isValid(cleanDocument) : cnpj.isValid(cleanDocument);

                if (isValid) {
                    console.log(`Documento válido: ${cleanDocument.length === 11 ? 'CPF' : 'CNPJ'}`);

                    // Realizar chamada para o serviço de compliance
                    console.log(cleanDocument)
                    const response = await axios.post(endpoint, {
                        document: Number(cleanDocument),
                    }, {
                        headers: {
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${complianceToken}`,
                        },
                    });

                    isValid = response.data.data.status === 1;
                    console.log(isValid)
                }
            } else {
                console.log('Documento inválido: formato incorreto.');
            }
        } catch (error) {
            console.error('Erro ao validar documento:', error);
        }

        // Retorna verdadeiro se for válido, falso caso contrário
        return isValid;
    }
}
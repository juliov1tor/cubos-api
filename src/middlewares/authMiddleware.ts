import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ComplianceService } from '../services/complianceService';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Token não fornecido.' });
        return;
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, 'secret') as { id: string, document: string }; 

        // Salvando os dados do usuário autenticado na requisição
        req.body.user = {
            id: decoded.id,
            document: decoded.document,
        };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};


export const complianceMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Buscar variavel da API externa
    try {
        console.log('teeeeeeeeesteeeeeeeeeeee', process.env.LOGIN, process.env.PASSWORD)
        const response = await ComplianceService.getAuthCode(
            String(process.env.LOGIN),
            String(process.env.PASSWORD),
        )
        // Obter código de autenticação caso não esteja salvo no banco, se buscar, salvar no banco de dados. 
        // Obter token de autenticação caso não esteja salvo no banco, se buscar, salvar no banco de dados.  
        // Chamar endpoint para reonvar o token de acesso e salvar no banco substituindo o atual.
        req.body.user = {
            ...req.body.user,
            complianceToken: response.acessToken,
            complianceRefreshToken: response.refreshToken,
        };

        next(); 
    } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

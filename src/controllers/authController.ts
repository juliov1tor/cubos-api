import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

class AuthController {
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { document, password } = req.body;  // Mudança para usar documento e senha
            const token = await AuthService.authenticate(document, password);

            res.status(200).json({
                token: `Bearer ${token}`,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    message: 'Erro ao autenticar o usuário.',
                });
            }
        }
    }
}

export default AuthController;

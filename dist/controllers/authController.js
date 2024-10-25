"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("../services/authService");
class AuthController {
    async login(req, res) {
        try {
            const { document, password } = req.body; // Mudança para usar documento e senha
            const token = await authService_1.AuthService.authenticate(document, password);
            res.status(200).json({
                token: `Bearer ${token}`, // Retornando o token no padrão Bearer
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    message: 'Erro ao autenticar o usuário.',
                });
            }
        }
    }
}
exports.default = AuthController;

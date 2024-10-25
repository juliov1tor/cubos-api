"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Token não fornecido.' });
        return; // Garante que nada mais será executado
    }
    const [, token] = authHeader.split(' '); // Pega apenas o token, ignorando "Bearer"
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'secret'); // Substitua 'secret' pela sua chave secreta
        // Salvando os dados do usuário autenticado na requisição
        req.user = {
            id: decoded.id,
            document: decoded.document,
        };
        next(); // Passa para o próximo middleware ou rota
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};
exports.authMiddleware = authMiddleware;

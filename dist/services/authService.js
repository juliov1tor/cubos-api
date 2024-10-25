"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const personModel_1 = require("../model/personModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static async authenticate(document, password) {
        // Busca a conta pelo documento
        const account = await personModel_1.Person.findOne({ where: { document } });
        if (!account) {
            throw new Error('Usuário não encontrado.');
        }
        // Verifica a senha
        const isPasswordValid = await bcrypt_1.default.compare(password, account.password);
        if (!isPasswordValid) {
            throw new Error('Senha inválida.');
        }
        // Gera um token JWT (substitua 'secret' pela sua chave secreta e ajuste o payload conforme necessário)
        const token = jsonwebtoken_1.default.sign({ id: account.id, document: account.document }, // Payload
        'secret', // Chave secreta (use uma variável de ambiente em produção)
        { expiresIn: '1h' } // Expiração do token
        );
        return token;
    }
}
exports.AuthService = AuthService;

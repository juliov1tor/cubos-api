"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Importando as rotas de autenticação
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Sincroniza os modelos com o banco de dados
database_1.sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado');
});
// Rotas
app.use('/api', accountRoutes_1.default);
app.use('/api', authRoutes_1.default); // Usando as rotas de autenticação
// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

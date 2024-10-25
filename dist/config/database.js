"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Conexão com o banco PostgreSQL
exports.sequelize = new sequelize_1.Sequelize('postgres://postgres:postgres@localhost:5432/teste', {
    dialect: 'postgres',
    logging: false,
});
// Testando a conexão com o banco de dados
exports.sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso.'))
    .catch((error) => console.error('Erro ao conectar com o banco de dados PostgreSQL:', error));

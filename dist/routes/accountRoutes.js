"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personController_1 = __importDefault(require("../controllers/personController"));
const accountController_1 = __importDefault(require("../controllers/accountController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const personController = new personController_1.default();
const accountController = new accountController_1.default();
// Endpoint para criar uma pessoa
router.post('/people', (req, res) => personController.createPerson(req, res));
// Endpoint para criar uma conta, protegido com o middleware de autenticação
router.post('/accounts', authMiddleware_1.authMiddleware, (req, res) => {
    accountController.createAccount(req, res);
});
exports.default = router;

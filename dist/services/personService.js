"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const personModel_1 = require("../model/personModel");
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
class PersonService {
    // Função para validar o documento (CPF ou CNPJ)
    static async validateDocument(document) {
        // Remover caracteres especiais do documento (CPF/CNPJ)
        const cleanDocument = document.replace(/[^\d]/g, '');
        // Log para depuração
        console.log(`Validando documento: ${cleanDocument}`);
        // Verificar se é CPF ou CNPJ e validar
        const isCpfValid = cpf_cnpj_validator_1.cpf.isValid(cleanDocument);
        const isCnpjValid = cpf_cnpj_validator_1.cnpj.isValid(cleanDocument);
        // Retorna true se for um CPF ou CNPJ válido
        if (isCpfValid) {
            console.log('Documento válido: CPF');
        }
        else if (isCnpjValid) {
            console.log('Documento válido: CNPJ');
        }
        else {
            console.log('Documento inválido.');
        }
        // Retorna verdadeiro se for válido, falso caso contrário
        return isCpfValid || isCnpjValid;
    }
    static async createPerson(personData) {
        // Verificar se a pessoa já existe com o documento fornecido
        const existingPerson = await personModel_1.Person.findOne({ where: { document: personData.document } });
        if (existingPerson) {
            throw new Error('Document already exists');
        }
        // Criptografando a senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt_1.default.hash(personData.password, 10);
        personData.password = hashedPassword;
        // Criando nova pessoa no banco de dados
        const newPerson = await personModel_1.Person.create(personData);
        return newPerson;
    }
}
exports.PersonService = PersonService;

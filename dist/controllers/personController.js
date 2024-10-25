"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personService_1 = require("../services/personService");
class PersonController {
    async createPerson(req, res) {
        try {
            const personData = req.body;
            // Validar documento na API de Compliance
            const isDocumentValid = await personService_1.PersonService.validateDocument(personData.document);
            if (!isDocumentValid) {
                res.status(400).json({ message: 'Documento inválido ou não autorizado.' });
                return;
            }
            const newPerson = await personService_1.PersonService.createPerson(personData);
            const response = {
                message: 'Pessoa criada com sucesso',
                payload: newPerson,
            };
            res.status(201).json(response);
        }
        catch (error) {
            if (error instanceof Error && error.message === 'Document already exists') {
                res.status(409).json({
                    message: 'Documento já existe.',
                });
            }
            else {
                res.status(500).json({
                    message: 'Erro ao criar a pessoa.',
                });
            }
        }
    }
}
exports.default = PersonController;

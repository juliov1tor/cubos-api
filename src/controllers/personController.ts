import { Request, Response } from 'express';
import { PersonService } from '../services/personService';
import { ControllerResponse } from '../model/baseModel';
import { ComplianceService } from '../services/complianceService';

class PersonController {
  public async createPerson(req: Request, res: Response): Promise<void> {
    try {
      const personData = req.body;
      // Validar documento na API de Compliance
      const isDocumentValid = await ComplianceService.validateDocument({ document: personData.document, complianceToken: personData.user.complianceToken });
      if (!isDocumentValid) {
        res.status(400).json({ message: 'Documento inválido ou não autorizado.' });
        return;
      }

      const newPerson = await PersonService.createPerson(personData);

      const response: ControllerResponse = {
        message: 'Pessoa criada com sucesso',
        payload: newPerson,
      };

      res.status(201).json(response);
    } catch (error) {
      if (error instanceof Error && error.message === 'Document already exists') {
        res.status(409).json({
          message: 'Documento já existe.',
        });
      } else {
        res.status(500).json({
          message: 'Erro ao criar a pessoa.',
        });
      }
    }
  }
}

export default PersonController;

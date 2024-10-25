import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();
const authController = new AuthController();

// Rota para autenticação
router.post('/login', authController.login.bind(authController));

export default router;

import express from 'express';
import { logincontroller, registerController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();


//@endpoint: /api/v1/auth/register
router.post('/register', registerController)

//@endpoint: /api/v1/auth/login
router.post('/login', logincontroller);

//@ protected route test:
//@endpoint: /api/v1/auth/test
router.get('/test', requireSignIn, isAdmin, testController);
// router.get('/test', testController);

export default router;
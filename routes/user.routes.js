import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegisterInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: jan.kowalski@example.com
 *         password:
 *           type: string
 *           example: StrongPass123!
 *     UserLoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: jan.kowalski@example.com
 *         password:
 *           type: string
 *           example: StrongPass123!
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterInput'
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: JWT token returned
 */
router.post('/login', userController.login);

export default router;
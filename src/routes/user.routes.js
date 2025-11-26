import express from 'express';

import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js';

const userRoutes = express.Router();

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [2. Business Settings]
 * 
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 status:
 *                   type: string
 *       400:
 *         description: Invalid data
 */
userRoutes.get('/', authController.authentication, authController.restrictTo('0'), userController.getAllUsers);

export default userRoutes;
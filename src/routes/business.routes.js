
import express from 'express';
import authController from '../controllers/auth.controller';
import businessController from '../controllers/business.controller';

const businessRoutes = express.Router();


/**
 * @swagger
 * /api/v1/business:
 *   post:
 *     summary: Create a new business
 *     tags: [2. Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nike Sneakers"
 *               isFeatured:
 *                 type: boolean
 *                 example: false
 *               productImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *               price:
 *                 type: number
 *                 format: decimal
 *                 example: 199.99
 *               shortDescription:
 *                 type: string
 *                 example: "A stylish and comfortable shoe for everyday wear."
 *               description:
 *                 type: string
 *                 example: "This sneaker features durable materials, soft cushioning, and a modern design."
 *               productUrl:
 *                 type: string
 *                 format: url
 *                 example: "https://example.com/business/nike-sneakers"
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Shoes", "Men", "Sports"]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["new", "hot", "sale"]
 *               createdBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: business created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "business created successfully"
 *                 data:
 *                   type: object
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Invalid data
 */

businessRoutes.post('/', authController.authentication, authController.restrictTo('0'), businessController.createBusiness);

/**
 * @swagger
 * /api/v1/business:
 *   get:
 *     summary: Add a new user
 *     tags: [2. Business]
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
businessRoutes.get('/', authController.authentication, authController.restrictTo('0'), businessController.getAllBusiness);

/**
 * @swagger
 * /api/v1/business/{id}:
 *   post:
 *     summary: Add a new user
 *     tags: [2. Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
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
businessRoutes.get('/:id', authController.authentication, authController.restrictTo('0'), businessController.getBusinessById);

/**
 * @swagger
 * /api/v1/business/{id}:
 *   patch:
 *     summary: Add a new user
 *     tags: [2. Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
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
businessRoutes.patch('/:id', authController.authentication, authController.restrictTo('0'), businessController.updateBusiness);

/**
 * @swagger
 * /api/v1/business/{id}:
 *   delete:
 *     summary: Add a new user
 *     tags: [2. Business]
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
businessRoutes.delete('/:id', authController.authentication, authController.restrictTo('0'), businessController.deleteBusiness);

export default businessRoutes;
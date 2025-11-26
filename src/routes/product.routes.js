
import express from 'express';
import authController from '../controllers/auth.controller';
import productController from '../controllers/product.controller';

const productRoutes = express.Router();


/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: Create a new product
 *     tags: [2. Business Settings]
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
 *                 example: "https://example.com/product/nike-sneakers"
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
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *                 data:
 *                   type: object
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Invalid data
 */

productRoutes.post('/', authController.authentication, authController.restrictTo('0'), productController.createProject);

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Add a new user
 *     tags: [2. Business Settings]
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
productRoutes.get('/', authController.authentication, authController.restrictTo('0'), productController.getAllProject);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   post:
 *     summary: Add a new user
 *     tags: [2. Business Settings]
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
productRoutes.get('/:id', authController.authentication, authController.restrictTo('0'), productController.getProjectById);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   patch:
 *     summary: Add a new user
 *     tags: [2. Business Settings]
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
productRoutes.patch('/:id', authController.authentication, authController.restrictTo('0'), productController.updateProject);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Add a new user
 *     tags: [2. Business Settings]
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
productRoutes.delete('/:id', authController.authentication, authController.restrictTo('0'), productController.deleteProject);

export default productRoutes;
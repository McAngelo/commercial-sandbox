import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();


const flutterwaveRoutes = express.Router();

/**
 * @swagger
 * /api/v1/flutterwave:
 *   get:
 *     summary: Returns a sample message
 *     tags: [Flutterwave Sandbox]
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello, World!
 */
// default index endpoint
flutterwaveRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.send('Hello, World!');
});



export default flutterwaveRoutes;
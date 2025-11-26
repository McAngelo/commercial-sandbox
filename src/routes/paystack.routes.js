import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();


const paystackRoutes = express.Router();

/**
 * @swagger
 * /api/v1/paystack:
 *   get:
 *     summary: Returns a sample message
 *     tags: [Paystack Sandbox]
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
paystackRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.send('Hello, World!, Paystack endpoint is coming soon');
});



export default paystackRoutes;
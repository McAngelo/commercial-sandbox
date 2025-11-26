import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();


const korapayRoutes = express.Router();

/**
 * @swagger
 * /api/v1/korapay:
 *   get:
 *     summary: Returns a sample message
 *     tags: [Kora Pay Sandbox]
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
korapayRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.send('Hello, World!, Kora Pay endpoint is coming soon');
});



export default korapayRoutes;

//mnotify
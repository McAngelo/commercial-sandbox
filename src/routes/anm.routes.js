import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();


const appsAndMobileRoutes = express.Router();

/**
 * @swagger
 * /api/v1/anm:
 *   get:
 *     summary: Returns a sample message
 *     tags: [Apps and Mobile Sandbox]
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
appsAndMobileRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.send('Hello, World!');
});



export default appsAndMobileRoutes;
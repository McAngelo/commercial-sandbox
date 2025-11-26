import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();


const mnotifyRoutes = express.Router();

/**
 * @swagger
 * /api/v1/mnotify:
 *   get:
 *     summary: Returns a sample message
 *     tags: [MNotify Sandbox]
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
mnotifyRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.send('Hello, World!, MNotify endpoint is coming soon');
});



export default mnotifyRoutes;
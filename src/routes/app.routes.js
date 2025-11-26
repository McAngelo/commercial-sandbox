import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';

import usersData from '../mock-db/users.data';

import userService from '../services/user.service';

import dotenv from 'dotenv';
dotenv.config();


const appRoutes = express.Router();

/**
 * @swagger
 * /api/v1:
 *   get:
 *     summary: Returns a sample message
 *     tags: [2. Business]
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
appRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.send('Hello, World!');
});

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [2. Business]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 status:
 *                   type: string
 */
appRoutes.get('/users', (req, res) => {
    res.status(StatusCodes.OK);
  res.status(StatusCodes.OK).send({data: usersData, status: getReasonPhrase(StatusCodes.OK)});
});

/**
 * @swagger
 * /api/v1/add:
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
 *       201:
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
// endpoint to create data
appRoutes.post('/add', (req, res) => {
  // Simulate data creation
  const data = [];
  const { body: user } = req;

  if(!user || Object.keys(user).length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).send({message: 'Invalid data', status: getReasonPhrase(StatusCodes.BAD_REQUEST)});
  }


  userService.createUser(user);


  data.push(req.body);
  res.status(StatusCodes.CREATED).send({message:'Data created successfully!', data, status: getReasonPhrase(StatusCodes.CREATED)});
});

export default appRoutes;
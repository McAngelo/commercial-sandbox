import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();


const naloRoutes = express.Router();

/**
 * @swagger
 * /api/v1/nalo:
 *   get:
 *     summary: Returns a sample message
 *     tags: [Nalo Sandbox]
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
naloRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.send('Hello, World!');
});


/**
 * @swagger
 * /api/v1/nalo/clientapi/generate-payment-token:
 *   post:
 *     summary: Query a transaction status
 *     tags: [Nalo Sandbox]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *         example: PHPSESSID=mmhsg9usr6ku84icj33lmt74oj
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchant_id:
 *                 type: string
 *                 example: hCuK9z9yoYMZ8yvtH7LUHP
 *             required:
 *               - merchant_id
 *     responses:
 *       200:
 *         description: Transaction status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Transaction status retrieved
 */

naloRoutes.post('/clientapi/generate-payment-token', (req, res) => {
  res.status(StatusCodes.OK).send({
    "success": true,
    "code": "TOKEN-CRTD-0050",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6Im1ucUREaGlTc3I2WThEUHk4RDJYb0QiLCJiYXNpY19hdXRoX2hlYWRlciI6IkJhc2ljIGFjMWMzYWQxNWUxZGNhNzVjOWFlZmY2YzQ3MWNmMjc3MjQwOWRjYzE5NTRlODFiZjIwM2YzYjAzNjk3NDNjNzYwZmE1ODk5N2NmNDBmODI1ZDc1YWNmYzJhMzJlZDlkYzYzNGE4YWRlN2NhOTBlZTU2ZDdiY2IwZGY1MjZiMjViIiwiaWF0IjoxNzU1NTE4NjIyLCJleHAiOjE3NTU1MTk1MjJ9.TCn6Nlpg0LjxbiExmaHG2egkGqsWyz-dc2id8amv-Cg"
    }
  });
});


/**
 * @swagger
 * /api/v1/nalo/clientapi/collection:
 *   post:
 *     summary: Initiate a collection request
 *     tags: [Nalo Sandbox]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6ImhDdUs5ejl5b1lNWjh5dnRIN0xVSFAiLCJiYXNpY19hdXRoX2hlYWRlciI6IkJhc2ljIDhkMjlkODQ1YjllNGNhYjU5NmQ2YmVkMTI1Y2IxMDk4OTI2NmYzNmM5ZWM2Y2RiZTA3NDFiOGI5OWMyZGNjYTVkNTlkNjI1NGY5NDQ2NjMwY2I0M2Y4YmQxZDlmMzMyYmY1OWZlMjg1YTg2NzQyOTU1YmVjZmJkOWNjZTRhMmRjIiwiaWF0IjoxNzM5MDk3OTk3LCJleHAiOjE3MzkwOTg1OTd9.SHCybyAeNuegC5bX140x6rGATGkwBqqHXc1_B0fdRcc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchant_id:
 *                 type: string
 *                 example: mnqDDhiSsr6Y8DPy8D2XoD
 *               service_name:
 *                 type: string
 *                 example: MOMO_TRANSACTION
 *               trans_hash:
 *                 type: string
 *                 example: 69cba164a6b28202ffe9294c7977586309699c22c526f9a96ecb0f15500be7ae
 *               account_number:
 *                 type: string
 *                 example: "0244071872"
 *               account_name:
 *                 type: string
 *                 example: Alexander Alex
 *               description:
 *                 type: string
 *                 example: description
 *               reference:
 *                 type: string
 *                 example: REF_2024_001
 *               network:
 *                 type: string
 *                 example: MTN
 *               amount:
 *                 type: number
 *                 example: 0.11
 *               callback:
 *                 type: string
 *                 example: https://callback.nalo.com/
 *             required:
 *               - merchant_id
 *               - service_name
 *               - trans_hash
 *               - account_number
 *               - account_name
 *               - description
 *               - reference
 *               - network
 *               - amount
 *               - callback
 *     responses:
 *       200:
 *         description: Collection request processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Collection request accepted
 */


naloRoutes.post('/clientapi/collection', (req, res) => {
  res.status(StatusCodes.OK).send({
    "success": true,
    "code": "PAY-CRTD-0055",
    "data": {
      "order_id": "FPewDB25nodznJawcNykhx",
      "status": "PENDING",
      "amount": 0.11,
      "timestamp": "2025-08-18 12:41:23",
      "otp_code": "None*252#"
    }
  });
});


/**
 * @swagger
 * /api/v1/nalo/clientapi/collection-status:
 *   post:
 *     summary: Check the status of a collection request
 *     tags: [Nalo Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchant_id:
 *                 type: string
 *                 example: hCuK9z9yoYMZ8yvtH7LUHP
 *               order_id:
 *                 type: string
 *                 example: 2jXVMbTidVjSvMGsD2fNWR
 *             required:
 *               - merchant_id
 *               - order_id
 *     responses:
 *       200:
 *         description: Collection status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Collection status retrieved
 */

naloRoutes.post('/clientapi/collection-status/', (req, res) => {
  res.status(StatusCodes.OK).send({
    "success": true,
    "code": "PAY-STAT-0080",
    "data": {
      "status": "PENDING",
      "amount": 0.11
    }
  });
});


/**
 * @swagger
 * /api/v1/nalo/hosted-checkout/generate-payment-token:
 *   post:
 *     summary: Query a transaction status
 *     tags: [Nalo Sandbox]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *         example: PHPSESSID=mmhsg9usr6ku84icj33lmt74oj
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchant_id:
 *                 type: string
 *                 example: hCuK9z9yoYMZ8yvtH7LUHP
 *             required:
 *               - merchant_id
 *     responses:
 *       200:
 *         description: Transaction status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Transaction status retrieved
 */

naloRoutes.post('/hosted-checkout/generate-payment-token', (req, res) => {
  res.status(StatusCodes.OK).send({
    "success": true,
    "code": "TOKEN-CRTD-0050",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6Im1ucUREaGlTc3I2WThEUHk4RDJYb0QiLCJiYXNpY19hdXRoX2hlYWRlciI6IkJhc2ljIGFjMWMzYWQxNWUxZGNhNzVjOWFlZmY2YzQ3MWNmMjc3MjQwOWRjYzE5NTRlODFiZjIwM2YzYjAzNjk3NDNjNzYwZmE1ODk5N2NmNDBmODI1ZDc1YWNmYzJhMzJlZDlkYzYzNGE4YWRlN2NhOTBlZTU2ZDdiY2IwZGY1MjZiMjViIiwiaWF0IjoxNzU1NTE4NjIyLCJleHAiOjE3NTU1MTk1MjJ9.TCn6Nlpg0LjxbiExmaHG2egkGqsWyz-dc2id8amv-Cg"
    }
  });
});

/**
 * @swagger
 * /api/v1/nalo/hosted-checkout/checkout/session:
 *   post:
 *     summary: Submit a merchant transaction with product summary (Nalo Sandbox)
 *     tags: [Nalo Sandbox]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6Im1ucUREaGlTc3I2WThEUHk4RDJYb0QiLCJiYXNpY19hdXRoX2hlYWRlciI6IkJhc2ljIGFjMWMzYWQxNWUxZGNhNzVjOWFlZmY2YzQ3MWNmMjc3MjQwOWRjYzE5NTRlODFiZjIwM2YzYjAzNjk3NDNjNzYwZmE1ODk5N2NmNDBmODI1ZDc1YWNmYzJhMzJlZDlkYzYzNGE4YWRlN2NhOTBlZTU2ZDdiY2IwZGY1MjZiMjViIiwiaWF0IjoxNzU1NTE4NjIyLCJleHAiOjE3NTU1MTk1MjJ9.TCn6Nlpg0LjxbiExmaHG2egkGqsWyz-dc2id8amv-Cg
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchant:
 *                 type: object
 *                 properties:
 *                   merchant_id:
 *                     type: string
 *                     example: mnqDDhiSsr6Y8DPy8D2XoD
 *                   order_id:
 *                     type: string
 *                     example: ORDER12345
 *                   customer_name:
 *                     type: string
 *                     example: GADDAFI
 *                   referral_url:
 *                     type: string
 *                     example: https://yourshop.com
 *                   callback_url:
 *                     type: string
 *                     example: https://yourshop.com/payment-callback
 *                   trans_hash:
 *                     type: string
 *                     example: 0cb9c7dccb4bd1588f919f61779fc1491af73e34dd94b1c695403da4ebacbe31
 *                   reference:
 *                     type: string
 *                     example: REF_2024_001
 *                   mode:
 *                     type: string
 *                     example: MOMO
 *                 required:
 *                   - merchant_id
 *                   - order_id
 *                   - customer_name
 *                   - referral_url
 *                   - callback_url
 *                   - trans_hash
 *                   - reference
 *                   - mode
 *               summary:
 *                 type: object
 *                 properties:
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Wireless Mouse
 *                         count:
 *                           type: integer
 *                           example: 2
 *                         price:
 *                           type: string
 *                           example: "25.00"
 *                   item_count:
 *                     type: integer
 *                     example: 3
 *                   total_price:
 *                     type: string
 *                     example: "170.00"
 *                 required:
 *                   - products
 *                   - item_count
 *                   - total_price
 *             required:
 *               - merchant
 *               - summary
 *     responses:
 *       200:
 *         description: Merchant transaction submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Merchant transaction submitted
 */

naloRoutes.post('/hosted-checkout/checkout/session', (req, res) => {
  res.status(StatusCodes.OK).send({
    "success": true,
    "code": "CHECKOUT-CRTD-0071",
    "data": {
      "checkout_url": "None?id=84887d1d-b783-49ea-a528-13332e274667",
      "checkout_timeout": 1800
    }
  });
});


/**
 * @swagger
 * /api/v1/nalo/hosted-checkout/collection-status:
 *   post:
 *     summary: Check the status of a collection request
 *     tags: [Nalo Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchant_id:
 *                 type: string
 *                 example: hCuK9z9yoYMZ8yvtH7LUHP
 *               order_id:
 *                 type: string
 *                 example: 2jXVMbTidVjSvMGsD2fNWR
 *             required:
 *               - merchant_id
 *               - order_id
 *     responses:
 *       200:
 *         description: Collection status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Collection status retrieved
 */

naloRoutes.post('/hosted-checkout/collection-status/', (req, res) => {
  res.status(StatusCodes.OK).send({
    "success": true,
    "code": "PAY-STAT-0080",
    "data": {
      "status": "PENDING",
      "amount": 0.11
    }
  });
});



export default naloRoutes;
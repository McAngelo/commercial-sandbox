import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();


const expressPayRoutes = express.Router();

/**
 * @swagger
 * /api/v1/express-pay:
 *   get:
 *     summary: Returns a sample message
 *     tags: [Express Pay Sandbox]
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
expressPayRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.send('Hello, World!');
});


/**
 * @swagger
 * /api/v1/express-pay/settlement:
 *   post:
 *     summary: Check account settlement
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: your-username
 *               auth-token:
 *                 type: string
 *                 example: your-auth-token
 *               type:
 *                 type: string
 *                 example: BALANCE
 *               reference-number:
 *                 type: string
 *                 example: "123"
 *             required:
 *               - username
 *               - auth-token
 *               - type
 *               - reference-number
 *     responses:
 *       200:
 *         description: Successful balance request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Balance retrieved
 */

expressPayRoutes.post('/settlement', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 0,
    "status-text": "Success",
    "balance": 1234,
    "reference-number": "RF43434",
    "currency": "GHS"
  });
});

/**
 * @swagger
 * /api/v1/express-pay/merchant/initiates:
 *   post:
 *     summary: Submit a new payment transaction
 *     tags: [Express Pay Sandbox]
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         schema:
 *           type: string
 *         example: application/x-www-form-urlencoded
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *         example: PHPSESSID=cfhb052j7h83mmlf8jrq92gu3r
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               merchant-id:
 *                 type: string
 *                 example: your-merchant-id
 *               api-key:
 *                 type: string
 *                 example: your-api-key
 *               firstname:
 *                 type: string
 *                 example: long
 *               lastname:
 *                 type: string
 *                 example: pass
 *               email:
 *                 type: string
 *                 example: longpass2020@gmail.com
 *               phonenumber:
 *                 type: string
 *                 example: "0244444444"
 *               username:
 *                 type: string
 *                 example: longpass2020@gmail.com
 *               accountnumber:
 *                 type: string
 *                 example: "36"
 *               currency:
 *                 type: string
 *                 example: GHS
 *               amount:
 *                 type: string
 *                 example: "33.00"
 *               order-id:
 *                 type: string
 *                 example: 90bffe561179ed97
 *               redirect-url:
 *                 type: string
 *                 example: https://google.com
 *             required:
 *               - merchant-id
 *               - api-key
 *               - firstname
 *               - lastname
 *               - email
 *               - phonenumber
 *               - username
 *               - accountnumber
 *               - currency
 *               - amount
 *               - order-id
 *               - redirect-url
 *     responses:
 *       200:
 *         description: Transaction submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Transaction submitted
 */

expressPayRoutes.post('/merchant/initiates', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 1,
    "order-id": "90bffe561179ed97",
    "guest-checkout": "TRUE",
    "merchantservice-title": "nn_ventures",
    "merchantservice-srvrtid": "906962986353",
    "message": "Success",
    "token": "316152c48865d04e73.2568619f619f52c4d04ec2.177113153192653f52c4d0",
    "redirect-url": "https://google.com",
    "user-key": null,
    "merchant-title": "NN VENTURES",
    "merchant-mcc": "5411",
    "merchant-city": "Accra",
    "merchant-countrycode": "GH"
  });
});

/**
 * @swagger
 * /api/v1/express-pay/merchant/query:
 *   post:
 *     summary: Query a transaction status (ExpressPay Sandbox)
 *     tags: [Express Pay Sandbox]
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         schema:
 *           type: string
 *         example: application/x-www-form-urlencoded
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *         example: PHPSESSID=mmhsg9usr6ku84icj33lmt74oj
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               merchant-id:
 *                 type: string
 *                 example: your-merchant-id
 *               api-key:
 *                 type: string
 *                 example: your-api-key
 *               token:
 *                 type: string
 *                 example: 904561a4bfe1bf8034.6464429061a4bfe1bf8098.60770438812561a4bfe1bf
 *             required:
 *               - merchant-id
 *               - api-key
 *               - token
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

expressPayRoutes.post('/merchant/query', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 1,
    "order-id": "90bffe561179ed97",
    "guest-checkout": "TRUE",
    "merchantservice-title": "nn_ventures",
    "merchantservice-srvrtid": "906962986353",
    "message": "Success",
    "token": "316152c48865d04e73.2568619f619f52c4d04ec2.177113153192653f52c4d0",
    "redirect-url": "https://google.com",
    "user-key": null,
    "merchant-title": "NN VENTURES",
    "merchant-mcc": "5411",
    "merchant-city": "Accra",
    "merchant-countrycode": "GH"
  });
});

/**
 * @swagger
 * /api/v1/express-pay/merchant-direct/initiates:
 *   post:
 *     summary: Submit a minimal payment request
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               merchant-id:
 *                 type: string
 *                 example: your-merchant-id
 *               api-key:
 *                 type: string
 *                 example: your-api-key
 *               currency:
 *                 type: string
 *                 example: GHS
 *               amount:
 *                 type: number
 *                 example: 33.00
 *               order-id:
 *                 type: string
 *                 example: 90bffe561179ed97
 *               post-url:
 *                 type: string
 *                 example: https://google.com
 *             required:
 *               - merchant-id
 *               - api-key
 *               - currency
 *               - amount
 *               - order-id
 *               - post-url
 *     responses:
 *       200:
 *         description: Minimal payment submission processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Payment submitted successfully
 */

expressPayRoutes.post('/merchant-direct/initiates', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 1,
    "order-id": "90bffe561179ed97",
    "token": "787461ded46931a485.1096669161ded46931a5f8.35327262396661ded46931"
  });
});

/**
 * @swagger
 * /api/v1/express-pay/merchant-direct/card-payment:
 *   post:
 *     summary: Submit card payment details 
 *     tags: [Express Pay Sandbox]
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         schema:
 *           type: string
 *         example: application/x-www-form-urlencoded
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *         example: PHPSESSID=mmhsg9usr6ku84icj33lmt74oj
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: 904561a4bfe1bf8034.6464429061a4bfe1bf8098.60770438812561a4bfe1bf
 *               card-number:
 *                 type: string
 *                 example: "XXXX XXXX XXXX"
 *               card-holder-name:
 *                 type: string
 *                 example: John Kweku Smith
 *               card-expiry:
 *                 type: string
 *                 example: 28/10/22
 *               card-cvv:
 *                 type: string
 *                 example: "565"
 *               card-address:
 *                 type: string
 *                 example: Really long address. P. O. Box
 *               card-city:
 *                 type: string
 *                 example: Accra
 *               card-state:
 *                 type: string
 *                 example: Greater Accra
 *               card-zipcode:
 *                 type: string
 *                 example: "0233"
 *               card-country:
 *                 type: string
 *                 example: Ghana
 *             required:
 *               - token
 *               - card-number
 *               - card-holder-name
 *               - card-expiry
 *               - card-cvv
 *               - card-address
 *               - card-city
 *               - card-state
 *               - card-zipcode
 *               - card-country
 *     responses:
 *       200:
 *         description: Card submission processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Card processed
 */

expressPayRoutes.post('/merchant-direct/card-payment', (req, res) => {
  res.status(StatusCodes.OK).send({
    "result": 3,
    "result-text": "No transaction data available",
    "order-id": "90bffe561179ed97",
    "token": "974361defed73d3bc5.4966686961defed73d3c32.32994872485661defed73d",
    "currency": "GHS",
    "amount": "33.00",
    "pmt-info": {
      "bin": "233244",
      "type": "card",
      "name": "",
      "country": ""
    }
  });
});

/**
 * @swagger
 * /api/v1/express-pay/merchant-direct/momo-payment:
 *   post:
 *     summary: Submit mobile money authorization details 
 *     tags: [Express Pay Sandbox]
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         schema:
 *           type: string
 *         example: application/x-www-form-urlencoded
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *         example: PHPSESSID=mmhsg9usr6ku84icj33lmt74oj
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: 904561a4bfe1bf8034.6464429061a4bfe1bf8098.60770438812561a4bfe1bf
 *               mobile-number:
 *                 type: string
 *                 example: "0203040900"
 *               mobile-network:
 *                 type: string
 *                 example: VODAFONE
 *               mobile-auth-token:
 *                 type: string
 *                 example: r90e099r90009res.9e9e09re9u333e.3383hr83rhfd
 *             required:
 *               - token
 *               - mobile-number
 *               - mobile-network
 *               - mobile-auth-token
 *     responses:
 *       200:
 *         description: Mobile money authorization submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Mobile authorization submitted
 */

expressPayRoutes.post('/merchant-direct/momo-payment', (req, res) => {
  res.status(StatusCodes.OK).send({
    "result": 1,
    "result-text": "Approved",
    "order-id": "49039ruuir",
    "token": "316152c48865d04e73.2568619f619f52c4d04ec2.177113153192653f52c4d0",
    "transaction-id": "906962986353",
    "currency": "GHS",
    "amount": 25,
    "date-processed": "31st January, 1995"
  });
});


/**
 * @swagger
 * /api/v1/express-pay/merchant-direct/query:
 *   post:
 *     summary: Query a transaction status 
 *     tags: [Express Pay Sandbox]
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         schema:
 *           type: string
 *         example: application/x-www-form-urlencoded
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *         example: PHPSESSID=mmhsg9usr6ku84icj33lmt74oj
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               merchant-id:
 *                 type: string
 *                 example: your-merchant-id
 *               api-key:
 *                 type: string
 *                 example: your-api-key
 *               token:
 *                 type: string
 *                 example: 904561a4bfe1bf8034.6464429061a4bfe1bf8098.60770438812561a4bfe1bf
 *             required:
 *               - merchant-id
 *               - api-key
 *               - token
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

expressPayRoutes.post('/merchant-direct/query', (req, res) => {
  res.status(StatusCodes.OK).send({
    "result": 1,
    "result-text": "Success",
    "order-id": "2c7bb737-fda8-4f4f-ae9d-b406f17ae48f",
    "token": "231562067e19a53358.8433682562067e19a53485.04579040878362067e19a5",
    "currency": "GHS",
    "amount": "33.00",
    "auth-code": "66978189xc01c",
    "transaction-id": "50d63406udd14",
    "date-processed": "2022-02-11 15:27:21"
  });
});

/**
 * @swagger
 * /api/v1/express-pay/tokenize/initiates:
 *   post:
 *     summary: Submit a payment request 
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               merchant-id:
 *                 type: string
 *                 example: your-merchant-id
 *               api-key:
 *                 type: string
 *                 example: your-api-key
 *               firstname:
 *                 type: string
 *                 example: long
 *               lastname:
 *                 type: string
 *                 example: pass
 *               email:
 *                 type: string
 *                 example: longpass2020@gmail.com
 *               phonenumber:
 *                 type: string
 *                 example: "0244444444"
 *               username:
 *                 type: string
 *                 example: longpass2020@gmail.com
 *               accountnumber:
 *                 type: string
 *                 example: "36"
 *               currency:
 *                 type: string
 *                 example: GHS
 *               payment-tokenize:
 *                 type: string
 *                 example: TRUE
 *               amount:
 *                 type: number
 *                 example: 33.00
 *               order-id:
 *                 type: string
 *                 example: 90bffe561179ed97
 *               redirect-url:
 *                 type: string
 *                 example: https://google.com
 *             required:
 *               - merchant-id
 *               - api-key
 *               - firstname
 *               - lastname
 *               - email
 *               - phonenumber
 *               - username
 *               - accountnumber
 *               - currency
 *               - payment-tokenize
 *               - amount
 *               - order-id
 *               - redirect-url
 *     responses:
 *       200:
 *         description: Payment submission processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Submitted successfully
 */

expressPayRoutes.post('/tokenize/initiates', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 1,
    "order-id": "b57c01dd-8322-4b05-93fa-6ac4948d7fd4",
    "guest-checkout": "TRUE",
    "merchantservice-name": "nn_ventures",
    "merchantservice-srvrtid": "906948373709",
    "message": "Success",
    "token": "996662068692c05931.4763323962068692c05981.12431661976162068692c0",
    "redirect-url": "https://google.com",
    "user-key": null,
    "merchant-name": "NN VENTURES",
    "merchant-mcc": "5411",
    "merchant-city": "Accra",
    "merchant-countrycode": "GH"
  });
});

/**
 * @swagger
 * /api/v1/express-pay/tokenize/charge:
 *   post:
 *     summary: Submit a payment using token 
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: your-api-key
 *               cctoken:
 *                 type: string
 *                 example: e24re89fhuduhd-894urihe8uhf8ui9hh-N5Gz5p7mmj6mAP5pG2xn-WGaapXVU0JKQ1mRDUDJ
 *             required:
 *               - token
 *               - cctoken
 *     responses:
 *       200:
 *         description: Payment submission via token processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Payment submitted using token
 */

expressPayRoutes.post('/tokenize/charge', (req, res) => {
  res.status(StatusCodes.OK).send({
    "result": 1,
    "result-text": "Success",
    "order-id": 12394,
    "token": "316152c48865d04e73.2568619f619f52c4d04ec2.177113153192653f52c4d0",
    "currency": "GHS",
    "amount": 121,
    "auth-code": "d6c40466x6add",
    "transaction-id": "7b198d0euewre",
    "date-processed": "12/8/2022"
  });
});

/**
 * @swagger
 * /api/v1/express-pay/tokenize/query:
 *   post:
 *     summary: Query transaction details using token 
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               merchant-id:
 *                 type: string
 *                 example: your-merchant-id
 *               api-key:
 *                 type: string
 *                 example: your-api-key
 *               token:
 *                 type: string
 *                 example: 4251620cd187566a62.40265206620cd187566aa8.503027653934620cd18756
 *             required:
 *               - merchant-id
 *               - api-key
 *               - token
 *     responses:
 *       200:
 *         description: Token query response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Transaction details retrieved
 */

expressPayRoutes.post('/tokenize/query', (req, res) => {
  res.status(StatusCodes.OK).send({
    "result": 1,
    "result-text": "Success",
    "order-id": 12394,
    "token": "316152c48865d04e73.2568619f619f52c4d04ec2.177113153192653f52c4d0",
    "currency": "GHS",
    "amount": 121,
    "date-processed": "12/8/2022",
    "auth-code": "dfcec8ecx5b9a",
    "card": [
      {
        "cctoken": "316152c48865d04e73.2568619sf619f52c4d04ec2.177113153192653f52c4d0",
        "ccnumber": "XXX XXX XXX",
        "type": "visa",
        "ccexp": 923
      }
    ]
  });
});

/**
 * @swagger
 * /api/v1/express-pay/invoice/dynamic-invoice:
 *   post:
 *     summary: Create a dynamic invoice 
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               merchant-id:
 *                 type: string
 *                 example: the-merchant-id
 *               api-key:
 *                 type: string
 *                 example: your-api-key
 *               amount:
 *                 type: number
 *                 example: 33.00
 *               accountnumber:
 *                 type: string
 *                 example: "0243123456"
 *               merchant-reference:
 *                 type: string
 *                 example: Merchant Reference
 *               description:
 *                 type: string
 *                 example: This is the description
 *               email-field:
 *                 type: string
 *                 example: OPTIONAL
 *               account-number-field:
 *                 type: string
 *                 example: Account number Field
 *               payer-reference-field:
 *                 type: string
 *                 example: OPTIONAL
 *               valid-until:
 *                 type: string
 *                 example: "14/09/2023"
 *               redirect-url:
 *                 type: string
 *                 example: https://google.com
 *               post-url:
 *                 type: string
 *                 example: https://google.com
 *             required:
 *               - merchant-id
 *               - api-key
 *               - amount
 *               - accountnumber
 *               - merchant-reference
 *               - description
 *               - valid-until
 *               - redirect-url
 *               - post-url
 *     responses:
 *       200:
 *         description: Dynamic invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 invoice_url: "https://example.com/invoice"
 */

expressPayRoutes.post('/invoice/dynamic-invoice', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 1,
    "message": "Dynamic invoice successfully created",
    "url": "http://sandbox.expresspaygh.com/inv/340"
  });
});

/**
 * @swagger
 * /api/v1/express-pay/invoice/token-query:
 *   post:
 *     summary: Query transaction status using token 
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               merchant-id:
 *                 type: string
 *                 example: your-merchant-id
 *               api-key:
 *                 type: string
 *                 example: your-api-key
 *               token:
 *                 type: string
 *                 example: 904561a4bfe1bf8034.6464429061a4bfe1bf8098.60770438812561a4bfe1bf
 *             required:
 *               - merchant-id
 *               - api-key
 *               - token
 *     responses:
 *       200:
 *         description: Token query response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Query completed
 */

expressPayRoutes.post('/invoice/token-query', (req, res) => {
  res.status(StatusCodes.OK).send({
    "result": 1,
    "result-text": "Success",
    "order-id": "inv.5262621e2df549a018.75350242621e2",
    "token": "5223621e2df54e4861.14091822621e2df54e48c1.522507882020621e2df54e",
    "currency": "GHS",
    "amount": "2000.00",
    "dynamic-invoice-id": "356",
    "first-name": "James",
    "last-name": "Bond",
    "email": "bond@mi6.co.uk",
    "phone-number": "0240000059",
    "account-number": "1234567890",
    "payer-reference": "007",
    "auth-code": "8cfsdsdxe2d2",
    "transaction-id": "2fac9af4uecc0",
    "date-processed": "2022-03-01 14:28:59"
  });
});



/**
 * @swagger
 * /api/v1/express-pay/billpay/services:
 *   post:
 *     summary: Retrieve available services 
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: your-username
 *               auth-token:
 *                 type: string
 *                 example: your-auth-token
 *               type:
 *                 type: string
 *                 example: SERVICES
 *             required:
 *               - username
 *               - auth-token
 *               - type
 *     responses:
 *       200:
 *         description: List of available services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 services: []
 */

expressPayRoutes.post('/billpay/services', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 0,
    "status-text": "Success",
    "services": [
      {
        "service": "AIRTELTIGO_GH",
        "name": "AirtelTigo Prepaid Topup",
        "category": "AIRTIME-TOPUP",
        "query": "FALSE"
      },
      {
        "service": "VODA_GH",
        "name": "Vodafone Prepaid Topup",
        "category": "AIRTIME-TOPUP",
        "query": "FALSE"
      }
    ]
  });
});

/**
 * @swagger
 * /api/v1/express-pay/billpay/query:
 *   post:
 *     summary: Query account or service information 
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: your-username
 *               auth-token:
 *                 type: string
 *                 example: your-auth-token
 *               type:
 *                 type: string
 *                 example: QUERY
 *               service:
 *                 type: string
 *                 example: MTN_DATA
 *               account-number:
 *                 type: string
 *                 example: 233243722297
 *               reference-number:
 *                 type: string
 *                 example: "123"
 *             required:
 *               - username
 *               - auth-token
 *               - type
 *               - service
 *               - account-number
 *               - reference-number
 *     responses:
 *       200:
 *         description: Successful query response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Query results returned
 */

expressPayRoutes.post('/billpay/query', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 0,
    "status-text": "Success",
    "reference-number": 12394,
    "account-info": "316152c48865d04e73.2568619f619f52c4d04ec2.177113153192653f52c4d0",
    "options": [
      {
        "title": "1.5GB Data Package",
        "package": "HUGE Dealz",
        "amount": 20,
        "currency": "GHS",
        "due-date": "10/09/2021"
      }
    ]
  });
});

/**
 * @swagger
 * /api/v1/express-pay/billpay/pay:
 *   post:
 *     summary: Initiate a bill payment 
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: your-username
 *               auth-token:
 *                 type: string
 *                 example: <auth-token>
 *               type:
 *                 type: string
 *                 example: PAY
 *               service:
 *                 type: string
 *                 example: MTN_DATA
 *               account-number:
 *                 type: string
 *                 example: 233243223959
 *               reference-number:
 *                 type: string
 *                 example: a8b153f3-059f-4f6f-89dc-0fd4861a3cbf
 *               package:
 *                 type: string
 *                 example: DAILY_20MB
 *               currency:
 *                 type: string
 *                 example: GHS
 *               amount:
 *                 type: number
 *                 example: 0.50
 *               payer-name:
 *                 type: string
 *                 example: Zaraki-Kenpachi
 *             required:
 *               - username
 *               - auth-token
 *               - type
 *               - service
 *               - account-number
 *               - reference-number
 *               - package
 *               - currency
 *               - amount
 *               - payer-name
 *     responses:
 *       200:
 *         description: Payment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Payment processed
 */

expressPayRoutes.post('/billpay/pay', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 0,
    "status-text": "Success",
    "reference-number": "99526338-1009-40fc-a2d7-3090d308f756",
    "balance": "4354.64",
    "currency": "GHS",
    "transaction-id": "8ff5c326u6cba",
    "receipt-number": "",
    "timestamp": "20220112102130"
  });
});

/**
 * @swagger
 * /api/v1/express-pay/billpay/status:
 *   post:
 *     summary: Check transaction status 
 *     tags: [Express Pay Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: your-username
 *               auth-token:
 *                 type: string
 *                 example: <auth-token>
 *               type:
 *                 type: string
 *                 example: STATUS
 *               reference-number:
 *                 type: string
 *                 example: RF34234
 *               transaction-id:
 *                 type: string
 *                 example: DS9043
 *             required:
 *               - username
 *               - auth-token
 *               - type
 *               - reference-number
 *               - transaction-id
 *     responses:
 *       200:
 *         description: Successful status lookup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Transaction status retrieved
 */
expressPayRoutes.post('/billpay/status', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": 0,
    "status-text": "Success",
    "reference-number": "bcc6a38a-8328-418b-9317-2c28e2ec2ab0",
    "transaction-id": "ea073e87u43ff",
    "timestamp": "2022-01-11 10:46:28"
  });
});



export default expressPayRoutes;
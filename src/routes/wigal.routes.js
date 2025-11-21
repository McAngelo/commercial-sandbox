import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import dotenv from 'dotenv';
import wigalController from '../controllers/wigal.controller';

dotenv.config();

const wigalRoutes = express.Router();

/**
 * @swagger
 * /api/v1/wigal:
 *   get:
 *     summary: Returns a sample message
 *     tags: [Wigal Sandbox]
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello, World!
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Bad request"
 *       401:
 *         description: Unauthorized - Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Authentication failed"
 *       403:
 *         description: Forbidden - Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Resource not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
// default index endpoint
wigalRoutes.get('/', wigalController.getHealthCheck);

/**
 * @swagger
 * /api/v1/wigal/callback-url:
 *   post:
 *     summary: Add a callback URL
 *     tags: [Wigal Sandbox]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: "codafric-1234"
 *               serviceId:
 *                 type: string
 *                 example: "donkomii-001"
 *               callbackUrl:
 *                 type: string
 *                 format: url
 *                 example: "https://donkomii.com/status-check"
 *     responses:
 *       200:
 *         description: Callback URL added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Callback URL saved successfully"
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Invalid payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "INVALID_REQUEST"
 *                 message:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       401:
 *         description: Unauthorized - Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Authentication failed"
 *       403:
 *         description: Forbidden - Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Resource not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
// default index endpoint
wigalRoutes.post('/callback-url', wigalController.addCallbackUrl);

/**
 * @swagger
 * /api/v1/wigal/balance:
 *   get:
 *     summary: Get Wigal balance
 *     tags: [Wigal Sandbox]
 *     parameters:
 *       - in: header
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_api_key_here"
 *         description: API key for authentication
 *       - in: header
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_username_here"
 *         description: Username associated with the API key
 *     responses:
 *       200:
 *         description: Balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   example: 1500.75
 *                 currency:
 *                   type: string
 *                   example: "GHS"
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Missing or invalid headers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "INVALID_REQUEST"
 *                 message:
 *                   type: string
 *                   example: "Missing or invalid headers"
 *       401:
 *         description: Unauthorized - Invalid API key or username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Invalid API key or username"
 *       403:
 *         description: Forbidden - Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Balance information not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// default index endpoint
wigalRoutes.get('/balance', wigalController.getBalance);


/**
 * @swagger
 * /api/v1/wigal/sms/send-general:
 *   post:
 *     summary: POST general SMS
 *     tags: [Wigal Sandbox]
 *     parameters:
 *       - in: header
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_api_key_here"
 *         description: API key for authentication
 *       - in: header
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_username_here"
 *         description: Username associated with the API key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderid:
 *                 type: string
 *                 example: "Lomo Inc"
 *               destinations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     destination:
 *                       type: string
 *                       example: "0222222222"
 *                     msgid:
 *                       type: string
 *                       example: "MGS1010101"
 *               message:
 *                 type: string
 *                 example: "This is a sample message for SMS sending via FrogAPI."
 *               smstype:
 *                 type: string
 *                 example: "text"
 *     responses:
 *       200:
 *         description: SMS sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SMS request accepted"
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Missing or invalid headers or payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "INVALID_REQUEST"
 *                 message:
 *                   type: string
 *                   example: "Invalid request parameters"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Sender ID is required", "Message length exceeds maximum limit", "Invalid destination number format"]
 *       401:
 *         description: Unauthorized - Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Authentication failed"
 *       403:
 *         description: Forbidden - Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Sender ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SENDER_ID_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Sender ID not found or not approved"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */


// default index endpoint
wigalRoutes.post('/sms/send-general', wigalController.sendGeneralSms);

/* 
  400 responses
  {
      "status": "INVALID_REQUEST",
      "message": "Invalid request parameters",
      "errors": [
          "Sender ID is required",
          "Message length exceeds maximum limit",
          "Invalid destination number format"
      ],
  }

  401 responses
  {
      "status": "UNAUTHORIZED",
      "message": "Authentication failed"
  }

  403 responses
  {
      "status": "FORBIDDEN",
      "message": "You do not have permission to access this resource"
  }

  404 responses
  {
      "status": "SENDER_ID_NOT_FOUND",
      "message": "Sender ID not found or not approved"
  }

  500 responses
  {
      "status": "ERROR",
      "message": "Internal server error."
  }

*/


/**
 * @swagger
 * /api/v1/wigal/sms/send-personalized:
 *   post:
 *     summary: POST personalized SMS
 *     tags: [Wigal Sandbox]
 *     parameters:
 *       - in: header
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_api_key_here"
 *         description: API key for authentication
 *       - in: header
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_username_here"
 *         description: Username associated with the API key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderid:
 *                 type: string
 *                 example: "Lomo Inc"
 *               destination:
 *                  type: string
 *                  example: "0222222222"
 *               msgid:
 *                  type: string
 *                  example: "MGS1010101"
 *               message:
 *                 type: string
 *                 example: "This is a sample message for SMS sending via FrogAPI."
 *               smstype:
 *                 type: string
 *                 example: "text"
 *     responses:
 *       200:
 *         description: SMS sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SMS request accepted"
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Missing or invalid headers or payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "INVALID_REQUEST"
 *                 message:
 *                   type: string
 *                   example: "Invalid request parameters"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Sender ID is required", "Message length exceeds maximum limit", "Invalid destination number format"]
 *       401:
 *         description: Unauthorized - Invalid API credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Invalid API credentials"
 *       403:
 *         description: Forbidden - Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Sender ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SENDER_ID_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Sender ID is not valid"
 *                 data:
 *                   type: null
 *                   example: null
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */


// default index endpoint
wigalRoutes.post('/sms/send-personalized', wigalController.sendPersonalizedSms);

/* 
  400 responses
  {
      "status": "INVALID_REQUEST",
      "message": "Invalid request parameters",
      "errors": [
          "Sender ID is required",
          "Message length exceeds maximum limit",
          "Invalid destination number format"
      ],
  }

  401 responses
  {
      "status": "UNAUTHORIZED",
      "message": "Invalid API credentials"
  }


  404 responses
  {
      "status": "SENDER_ID_NOT_FOUND",
      "message": "Sender ID: 4865 is not valid",
      "data": null
  }

  500 responses
  {
      "status": "ERROR",
      "message": "Internal server error."
  }

*/

/**
 * @swagger
 * /api/v1/wigal/sms/history:
 *   post:
 *     summary: POST history
 *     tags: [Wigal Sandbox]
 *     parameters:
 *       - in: header
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_api_key_here"
 *         description: API key for authentication
 *       - in: header
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_username_here"
 *         description: Username associated with the API key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderid:
 *                 type: string
 *                 example: "OGK1234"
 *               servicetype:
 *                  type: string
 *                  example: "Text"
 *               msgid:
 *                  type: string
 *                  example: "MGS1010101"
 *               status:
 *                 type: string
 *                 example: "DELIVRD"
 *               service:
 *                 type: string
 *                 example: "SMS"
 *               datefrom:
 *                 type: string
 *                 example: "2024-04-01"
 *               dateto:
 *                 type: string
 *                 example: "2024-06-18"
 *     responses:
 *       200:
 *         description: SMS sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SMS request accepted"
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Missing or invalid headers or payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "INVALID_REQUEST"
 *                 message:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       401:
 *         description: Unauthorized - Invalid API key or username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Invalid API key or username"
 *                 data:
 *                   type: null
 *                   example: null
 *       403:
 *         description: Forbidden - Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: No history records found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "FAILED"
 *                 message:
 *                   type: string
 *                   example: "No history records found"
 *                 data:
 *                   type: null
 *                   example: null
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 data:
 *                   type: null
 *                   example: null
 */

                    

// default index endpoint
wigalRoutes.post('/sms/history', wigalController.getSmsHistory);

/* 

  401 responses
  {
      "status": "UNAUTHORIZED",
      "message": "Invalid API key or username",
      "data": null
  }


  404 responses
  {
      "status": "FAILED",
      "message": "No history records found",
      "data": null
  }

  500 responses
  {
      "status": "ERROR",
      "message": "Internal server error."
      "data": null
  }

*/


/**
 * @swagger
 * /api/v1/wigal/sms/otp/generate:
 *   post:
 *     summary: POST generate OTP SMS
 *     tags: [Wigal Sandbox]
 *     parameters:
 *       - in: header
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_api_key_here"
 *         description: API key for authentication
 *       - in: header
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_username_here"
 *         description: Username associated with the API key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderid:
 *                 type: string
 *                 example: "OGK1234"
 *               type:
 *                  type: string
 *                  example: "ALPHANUMERIC"
 *               messagetemplate:
 *                  type: string
 *                  example: "Hello, your OTP is : %OTPCODE%. It will expire after %EXPIRY% mins"
 *               length:
 *                 type: number
 *                 example: 5
 *               expiry:
 *                 type: number
 *                 example: 1
 *               number:
 *                 type: string
 *                 example: "0276128936"
 *     responses:
 *       200:
 *         description: SMS sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SMS request accepted"
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Missing or invalid headers or payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Message template must contain %OTPCODE% placeholder"
 *       401:
 *         description: Unauthorized - Invalid API key or username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Invalid API key or username"
 *                 data:
 *                   type: null
 *                   example: null
 *       403:
 *         description: Forbidden - Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Invalid phone number format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Invalid phone number format"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 data:
 *                   type: null
 *                   example: null
 */

                    

// default index endpoint
wigalRoutes.post('/sms/otp/generate', wigalController.generateOtp);

/* 

  401 responses
  {
      "status": "UNAUTHORIZED",
      "message": "Invalid API key or username",
      "data": null
  }

  402
  {
    "status": "ERROR",
    "message": "Insufficient balance to process request"
  }


  404 responses
  {
      "status": "ERROR",
      "message": "Invalid phone number format"
  }

  422 responses
  {
      "status": "ERROR",
      "message": "Message template must contain %OTPCODE% placeholder"
  }

  500 responses
  {
      "status": "ERROR",
      "message": "Internal server error."
      "data": null
  }

*/


/**
 * @swagger
 * /api/v1/wigal/sms/otp/verify:
 *   post:
 *     summary: POST verify OTP SMS
 *     tags: [Wigal Sandbox]
 *     parameters:
 *       - in: header
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_api_key_here"
 *         description: API key for authentication
 *       - in: header
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: "your_username_here"
 *         description: Username associated with the API key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otpcode:
 *                 type: string
 *                 example: "8a2b3"
 *               number:
 *                 type: string
 *                 example: "0276128936"
 *     responses:
 *       200:
 *         description: SMS sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SMS request accepted"
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Missing or invalid headers or payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Missing required fields"
 *       401:
 *         description: Unauthorized - Invalid API key or username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Invalid API key or username"
 *                 data:
 *                   type: null
 *                   example: null
 *       403:
 *         description: Forbidden - Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Invalid OTP code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Invalid OTP code"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 data:
 *                   type: null
 *                   example: null
 */

                    

// default index endpoint
wigalRoutes.post('/sms/otp/verify', wigalController.verifyOtp);

/* 

  400 responses
  {
    "status": "ERROR",
    "message": "Missing required fields"
  }

  401 responses
  {
      "status": "UNAUTHORIZED",
      "message": "Invalid API key or username",
      "data": null
  }

  402
  {
    "status": "ERROR",
    "message": "Insufficient balance to process request"
  }


  404 responses
  {
      "status": "ERROR",
      "message": "Invalid OTP code"
  }

  408 responses
  {
    "status": "ERROR",
    "message": "OTP code has expired"
  }

  422 responses
  {
      "status": "ERROR",
      "message": "Message template must contain %OTPCODE% placeholder"
  }

  500 responses
  {
      "status": "ERROR",
      "message": "Internal server error."
      "data": null
  }

*/


export default wigalRoutes;
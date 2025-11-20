import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import dotenv from 'dotenv';
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
 */
// default index endpoint
wigalRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.send('Hello, World!');
});

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
 */
// default index endpoint
wigalRoutes.post('/callback-url', (req, res) => {
  res.status(StatusCodes.OK).send( {
    "msgid": "MGS1010101",
    "status": "DELIVRD",
    "reason": "DELIVRD",
    "destination": "233276128036",
    "statusdate": "2024-04-23T14:59:14.143+00:00",
    "handlecharge": 4,
    "topupcharge": 0
  });
});

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
 */

// default index endpoint
wigalRoutes.get('/balance', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": "SUCCESS",
    "message": "SUCCESS",
    "data": {
        "paidcashbalance": 0,
        "cashbalance": 677.56,
        "bundles": {
            "VOICE": 15,
            "KYCVERIFY": 12,
            "SIMACTIVE": 123,
            "SMS": 82,
            "USSD": 100
        },
        "invoicesummary": [
            {
                "invoicetype": "TOPUP",
                "count": 2,
                "totalamount": 2
            },
            {
                "invoicetype": "BUNDLE",
                "count": 2,
                "totalamount": 11
            },
            {
                "invoicetype": "CREDIT_NOTE",
                "count": 6,
                "totalamount": 126
            },
            {
                "invoicetype": "IOU",
                "count": 1,
                "totalamount": 1000
            }
        ],
        "activebundleinvoices": [
            {
                "id": 387,
                "description": "Mashup Bundle dash",
                "enddate": "2024-08-30",
                "invoicetype": "BUNDLE",
                "details": [
                    {
                        "service": "KYCVERIFY",
                        "quantity": 12,
                        "used": 0
                    },
                    {
                        "service": "VOICE",
                        "quantity": 15,
                        "used": 0
                    },
                    {
                        "service": "SIMACTIVE",
                        "quantity": 123,
                        "used": 0
                    },
                    {
                        "service": "USSD",
                        "quantity": 100,
                        "used": 0
                    },
                    {
                        "service": "SMS",
                        "quantity": 100,
                        "used": 18
                    }
                ]
            }
        ]
    }
});
});


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
 */


// default index endpoint
wigalRoutes.post('/sms/send-general', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": "ACCEPTD",
    "message": "Message Accepted For Processing",
    "messageId": "MSG123456789",
    "timestamp": "2024-02-05T12:34:56Z",
    "creditUsed": 1,
    "remainingCredits": 9999
  });
});

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
 */


// default index endpoint
wigalRoutes.post('/sms/send-personalized', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": "ACCEPTD",
    "message": "Message Accepted For Processing"
  });
});

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
 */

                    

// default index endpoint
wigalRoutes.post('/sms/history', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": "SUCCESS",
    "message": "Success",
    "data": {
      "content": [
        {
          "apimessageid": "MGS1010101",
          "status": "DELIVRD",
          "statusreason": "DELIVRD",
          "recipient": "233542709210",
          "statusdate": "2024-06-26T13:06:14.087856",
          "bundlecredits": 0,
          "charge": 0.03,
          "service": "SMS",
          "servicetype": "TEXT",
          "messagecount": 1,
          "charactercount": 53
        },
        {
          "apimessageid": "MGS1010101",
          "status": "DELIVRD",
          "statusreason": "DELIVRD",
          "recipient": "233542409410",
          "statusdate": "2024-06-26T13:12:55.771246",
          "bundlecredits": 0,
          "charge": 0.03,
          "service": "SMS",
          "servicetype": "TEXT",
          "messagecount": 1,
          "charactercount": 55
        },
        {
          "apimessageid": "MGS1010101",
          "status": "DELIVRD",
          "statusreason": "DELIVRD",
          "recipient": "233542909410",
          "statusdate": "2024-06-26T13:14:23.801293",
          "bundlecredits": 0,
          "charge": 0.03,
          "service": "SMS",
          "servicetype": "TEXT",
          "messagecount": 1,
          "charactercount": 46
        }
      ],
      "pageable": {
        "pageNumber": 0,
        "pageSize": 50,
        "sort": {
          "sorted": false,
          "empty": true,
          "unsorted": true
        },
        "offset": 0,
        "unpaged": false,
        "paged": true
      },
      "last": true,
      "totalElements": 3,
      "totalPages": 1,
      "size": 50,
      "number": 0,
      "sort": {
        "sorted": false,
        "empty": true,
        "unsorted": true
      },
      "first": true,
      "numberOfElements": 3,
      "empty": false
    }
  });
});

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
 */

                    

// default index endpoint
wigalRoutes.post('/sms/otp/generate', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": "SUCCESS",
    "message": "OTP processed for delivery"
  });
});

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
 */

                    

// default index endpoint
wigalRoutes.post('/sms/otp/verify', (req, res) => {
  res.status(StatusCodes.OK).send({
    "status": "SUCCESS",
    "message": "OTP verified successfully"
  });
});

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
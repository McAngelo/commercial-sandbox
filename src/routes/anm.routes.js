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



/**
 * @swagger
 * /api/v1/anm/check_wallet_balance:
 *   post:
 *     summary: POST Check Wallet Balance
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               trans_type:
 *                 type: string
 *                 example: "BLC"
 *               ts:
 *                 type: string
 *                 example: "2022-01-01 23:20:50"
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
appsAndMobileRoutes.post('/check_wallet_balance', (req, res) => {
  res.status(StatusCodes.OK).send({
    "sms_bal": 56,
    "payout_bal": 3.72,
    "billpay_bal": 4.4,
    "available_collect_bal": 359.765,
    "airtime_bal": 30.9,
    "actual_collect_bal": 359.765
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


/**
 * @swagger
 * /api/v1/anm/checkTransaction:
 *   post:
 *     summary: POST Check Transaction
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               trans_type:
 *                 type: string
 *                 example: "TSC"
 *               exttrid:
 *                 type: string
 *                 example: "031059294635"
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
appsAndMobileRoutes.post('/checkTransaction', (req, res) => {
  res.status(StatusCodes.OK).send({
    "trans_status": "000/01",
    "trans_ref": "031059294635",
    "trans_id": "21870173572",
    "message": "SUCCESSFUL"
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

/**
 * @swagger
 * /api/v1/anm/sendSms:
 *   post:
 *     summary: POST Send SMS
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               trans_type:
 *                 type: string
 *                 example: "SMS"
 *               sender_id:
 *                 type: string
 *                 example: "NTC"
 *               recipient_number:
 *                 type: string
 *                 example: "233XXXXXXXXX"
 *               msg_type:
 *                 type: string
 *                 example: "T"
 *               msg_body:
 *                 type: string
 *                 example: "Your one-time password is 72755"
 *               unique_id:
 *                 type: string
 *                 example: "6528738478597202"
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
appsAndMobileRoutes.post('/sendSms', (req, res) => {
  res.status(StatusCodes.OK).send({
    "resp_desc":"Message successfully queued for delivery",
    "resp_code":"082"
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

/**
 * @swagger
 * /api/v1/anm/debit-credit/sendRequest:
 *   post:
 *     summary: POST Debit Credit Send Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               trans_type:
 *                 type: string
 *                 example: "CTM"
 *               customer_number:
 *                 type: string
 *                 example: "0123456789"
 *               amount:
 *                 type: string
 *                 example: "10.00"
 *               nw:
 *                 type: string
 *                 example: "MTN"
 *               reference:
 *                 type: string
 *                 example: "Test payment"
 *               callback_url:
 *                 type: string
 *                 example: "https://my.callback_url.com/payment/callback"
 *               exttrid:
 *                 type: string
 *                 example: "4243846988303"
 *               ts:
 *                 type: string
 *                 example: "2021-10-21 07:21:43"
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
appsAndMobileRoutes.post('/debit-credit/sendRequest', (req, res) => {
  res.status(StatusCodes.OK).send({
    "resp_desc": "Request successfully received for processing",
    "resp_code": "015"
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


/**
 * @swagger
 * /api/v1/anm/air-time-topup/sendRequest:
 *   post:
 *     summary: POST Air Time Topup Send Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               trans_type:
 *                 type: string
 *                 example: "ATP"
 *               customer_number:
 *                 type: string
 *                 example: "0123456789"
 *               amount:
 *                 type: string
 *                 example: "10.00"
 *               nw:
 *                 type: string
 *                 example: "MTN"
 *               reference:
 *                 type: string
 *                 example: "Test payment"
 *               callback_url:
 *                 type: string
 *                 example: "https://my.callback_url.com/payment/callback"
 *               exttrid:
 *                 type: string
 *                 example: "4243846303"
 *               ts:
 *                 type: string
 *                 example: "2021-10-21 07:21:43"
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
appsAndMobileRoutes.post('/debit-credit/sendRequest', (req, res) => {
  res.status(StatusCodes.OK).send({
    "resp_desc": "Request successfully received for processing",
    "resp_code": "015"
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

/**
 * @swagger
 * /api/v1/anm/bill-payment/sendRequest:
 *   post:
 *     summary: POST Bill Payment Send Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               trans_type:
 *                 type: string
 *                 example: "BLP"
 *               acount_number:
 *                 type: string
 *                 example: "0123456789"
 *               amount:
 *                 type: string
 *                 example: "10.00"
 *               nw:
 *                 type: string
 *                 example: "MPR"
 *               callback_url:
 *                 type: string
 *                 example: "https://my.callback_url.com/payment/callback"
 *               exttrid:
 *                 type: string
 *                 example: "4243846303"
 *               ts:
 *                 type: string
 *                 example: "2021-10-21 07:21:43"
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
appsAndMobileRoutes.post('/bill-payment/sendRequest', (req, res) => {
  res.status(StatusCodes.OK).send({
    "resp_desc": "Request successfully completed",
    "resp_code": "027"
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

/**
 * @swagger
 * /api/v1/anm/ghipss-payment/sendRequest:
 *   post:
 *     summary: POST GHIPSS Payment Send Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               trans_type:
 *                 type: string
 *                 example: "TM"
 *               landing_page:
 *                 type: string
 *                 example: "url"
 *               amount:
 *                 type: string
 *                 example: "10.00"
 *               nw:
 *                 type: string
 *                 example: "MPR"
 *               callback_url:
 *                 type: string
 *                 example: "https://my.callback_url.com/payment/callback"
 *               exttrid:
 *                 type: string
 *                 example: "4243846303"
 *               ts:
 *                 type: string
 *                 example: "2021-10-21 07:21:43"
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
appsAndMobileRoutes.post('/ghipss-payment/sendRequest', (req, res) => {
  res.status(StatusCodes.OK).send({
    "resp_code": "000",
    "form_url": "https://gigs-test.ghipss.com:7543/EcomPayment/RedirectAuthLink",
    "form_details": {
      "MerID": "123",
      "AcqID": "315",
      "OrderID": "6582",
      "MerRespURL": "https://appsnmobileagent.com:8215/return_resp",
      "PurchaseAmt": "000100",
      "PurchaseCurrency": 936,
      "PurchaseCurrencyExponent": 2,
      "CaptureFlag": "A",
      "Signature": "IAANKxiU=",
      "SignatureMethod": "SHA1",
      "Version": "1.0.0"
    }
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


/**
 * @swagger
 * /api/v1/anm/account-inquiry/sendRequest:
 *   post:
 *     summary: POST Account inquiry Send Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               trans_type:
 *                 type: string
 *                 example: "AII"
 *               customer_number:
 *                 type: string
 *                 example: "0123456789"
 *               nw:
 *                 type: string
 *                 example: "BNK"
 *               bank_code:
 *                 type: string
 *                 example: "VOD"
 *               exttrid:
 *                 type: string
 *                 example: "4243846988303"
 *               ts:
 *                 type: string
 *                 example: "2021-10-21 07:21:43"
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
appsAndMobileRoutes.post('/account-inquiry/sendRequest', (req, res) => {
  res.status(StatusCodes.OK).send({
    "resp_code": "027",
    "resp_desc": "Request successfully completed",
    "name": "John Doe"
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

/**
 * @swagger
 * /api/v1/anm/verifyID:
 *   post:
 *     summary: POST ID verification
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               id_num:
 *                 type: string
 *                 example: "GHA-xxxxxxxxx-x"
 *               id_type:
 *                 type: string
 *                 example: "GCA"
 *               image:
 *                 type: string
 *                 example: "base64-encoded-live-photo"
 *               exttrid:
 *                 type: string
 *                 example: "4243846988303"
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
appsAndMobileRoutes.post('/verifyID', (req, res) => {
  res.status(StatusCodes.OK).send({
    "resp_code": "027",
    "resp_desc": "Request successfully completed",
    "data": {
      "name": "XXXXXX",
      "gender": "M",
      "verified": "true",
      "card_valid_start": "2022-01-01",
      "card_valid_end": "2028-01-02"
    }
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

/**
 * @swagger
 * /api/v1/anm/remittance/sendRequest:
 *   post:
 *     summary: POST Remittance Send Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               trans_type:
 *                 type: string
 *                 example: "RMT"
 *               customer_number:
 *                 type: string
 *                 example: "0123456789"
 *               nw:
 *                 type: string
 *                 example: "VOD"
 *               sender_name:
 *                 type: string
 *                 example: "Kofi Mensah"
 *               sender_number:
 *                 type: string
 *                 example: "23359562354"
 *               sender_gender:
 *                 type: string
 *                 example: "M"
 *               recipient_name:
 *                 type: string
 *                 example: "Ama Lovely"
 *               recipient_address:
 *                 type: string
 *                 example: "Box MD ABC, Accra"
 *               recipient_gender:
 *                 type: string
 *                 example: "F"
 *               transf_curr_code:
 *                 type: string
 *                 example: "GBP"
 *               ctry_origin_code:
 *                 type: string
 *                 example: "GBP"
 *               transf_amount:
 *                 type: string
 *                 example: "120.00"
 *               amount:
 *                 type: string
 *                 example: "100.00"
 *               transf_purpose:
 *                 type: string
 *                 example: "Remittance testing"
 *               callback_url:
 *                 type: string
 *                 format: url
 *                 example: "https://donkomii.com/status-check"
 *               exttrid:
 *                 type: string
 *                 example: "4243846988303"
 *               ts:
 *                 type: string
 *                 example: "2021-10-21 07:21:43"
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
appsAndMobileRoutes.post('/remittance/sendRequest', (req, res) => {
  res.status(StatusCodes.OK).send({
    "resp_desc": "Request successfully received for processing",
    "resp_code": "015"
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

/**
 * @swagger
 * /api/v1/anm/third_party_request:
 *   post:
 *     summary: POST Third Party Payment Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               nickname:
 *                 type: string
 *                 example: "sconty"
 *               landing_page:
 *                 type: string
 *                 example: "url"
 *               currency_code:
 *                 type: string
 *                 example: "GHS"
 *               currency_val:
 *                 type: string
 *                 example: "0.01"
 *               amount:
 *                 type: string
 *                 example: "100.00"
 *               payment_mode:
 *                 type: string
 *                 example: "CRD"
 *               reference:
 *                 type: string
 *                 example: "Test payment"
 *               callback_url:
 *                 type: string
 *                 format: url
 *                 example: "https://donkomii.com/payment-confirmation"
 *               exttrid:
 *                 type: string
 *                 example: "4243846988303"
 *               ts:
 *                 type: string
 *                 example: "2021-10-21 07:21:43"
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
appsAndMobileRoutes.post('/third_party_request', (req, res) => {
  res.status(StatusCodes.OK).send({
    "resp_code": "000",
    "resp_desc": "Passed",
    "redirect_url": "https://payments.anmgw.com/payment_page?code=dG9rZW49NDM3MTkwMjIyMTMxNzk5OSZ0cmFuc19pZD02NDYxOTAyMjIxMzE3OTIxNjI2=="
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


/**
 * @swagger
 * /api/v1/anm/auto-debit/subscription:
 *   post:
 *     summary: POST Auto-Debit subscription Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               nw:
 *                 type: string
 *                 example: "MTN"
 *               customer_number:
 *                 type: string
 *                 example: "233595999364"
 *               cycle:
 *                 type: string
 *                 example: "DLY"
 *               resumable:
 *                 type: string
 *                 example: "Y"
 *               amount:
 *                 type: string
 *                 example: "100.00"
 *               cycle_skip:
 *                 type: string
 *                 example: "Y"
 *               reference:
 *                 type: string
 *                 example: "Auto Debit Test"
 *               return_url:
 *                 type: string
 *                 format: url
 *                 example: "https://donkomii.com/payment-confirmation" 
 *               uniq_ref_id:
 *                 type: string
 *                 example: "4243846988303"
 *               start_date:
 *                 type: string
 *                 example: "2020-10-01"
 *               end_date:
 *                 type: string
 *                 example: "2022-11-01"
 *               operation:
 *                 type: string
 *                 example: "SUB"
 *               apply_penalty:
 *                 type: string
 *                 example: "NO"
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
appsAndMobileRoutes.post('/auto-debit/subscription', (req, res) => {
  res.status(StatusCodes.OK).send({
    profile:{
    "amount": "0.10",
    "callback_url": "http://localhost/callback_response",
    "cancel_date": "",
    "completed": false,
    "customer_number": "233595999364",
    "cycle": "Daily",
    "cycle_skip": "Y",
    "end_date": "2023-07-29 10:30:00",
    "nw": "MTN",
    "resumable": "Y",
    "service_id": "abcd",
    "service_name": "Test service",
    "start_date": "2023-07-28 09:00:00",
    "status": "Suspended",
    "subscription_date": "2023-07-24 04:51:50",
    "uniq_ref_id": "8901234567891"
      },
    transactions: [
    {
             "prev_schedule": "",
             "processing_id": "PR65565656",
             "trans_date": "2023-07-24 04:51:50",
             "trans_id": "226566565",
             "trans_msg": "SUCCESS",
             "trans_ref": "Auto Debit",
             "trans_status": "Active"
       }
    ]
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

/**
 * @swagger
 * /api/v1/anm/auto-debit/otp-validation:
 *   post:
 *     summary: POST Auto-Debit OTP Validation Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               uniq_ref_id:
 *                 type: string
 *                 example: "4243846988303"
 *               operation:
 *                 type: string
 *                 example: "OTP"
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
appsAndMobileRoutes.post('/auto-debit/otp-validation', (req, res) => {
  res.status(StatusCodes.OK).send({
    profile:{
    "amount": "0.10",
    "callback_url": "http://localhost/callback_response",
    "cancel_date": "",
    "completed": false,
    "customer_number": "233595999364",
    "cycle": "Daily",
    "cycle_skip": "Y",
    "end_date": "2023-07-29 10:30:00",
    "nw": "MTN",
    "resumable": "Y",
    "service_id": "abcd",
    "service_name": "Test service",
    "start_date": "2023-07-28 09:00:00",
    "status": "Suspended",
    "subscription_date": "2023-07-24 04:51:50",
    "uniq_ref_id": "8901234567891"
      },
    transactions: [
    {
             "prev_schedule": "",
             "processing_id": "PR65565656",
             "trans_date": "2023-07-24 04:51:50",
             "trans_id": "226566565",
             "trans_msg": "SUCCESS",
             "trans_ref": "Auto Debit",
             "trans_status": "Active"
       }
    ]
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

/**
 * @swagger
 * /api/v1/anm/auto-debit/suspend:
 *   post:
 *     summary: POST Auto-Debit Suspend Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               uniq_ref_id:
 *                 type: string
 *                 example: "4243846988303"
 *               operation:
 *                 type: string
 *                 example: "SUS"
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
appsAndMobileRoutes.post('/auto-debit/suspend', (req, res) => {
  res.status(StatusCodes.OK).send({
    profile:{
    "amount": "0.10",
    "callback_url": "http://localhost/callback_response",
    "cancel_date": "",
    "completed": false,
    "customer_number": "233595999364",
    "cycle": "Daily",
    "cycle_skip": "Y",
    "end_date": "2023-07-29 10:30:00",
    "nw": "MTN",
    "resumable": "Y",
    "service_id": "abcd",
    "service_name": "Test service",
    "start_date": "2023-07-28 09:00:00",
    "status": "Suspended",
    "subscription_date": "2023-07-24 04:51:50",
    "uniq_ref_id": "8901234567891"
      },
    transactions: [
    {
             "prev_schedule": "",
             "processing_id": "PR65565656",
             "trans_date": "2023-07-24 04:51:50",
             "trans_id": "226566565",
             "trans_msg": "SUCCESS",
             "trans_ref": "Auto Debit",
             "trans_status": "Active"
       }
    ]
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

/**
 * @swagger
 * /api/v1/anm/auto-debit/resume:
 *   post:
 *     summary: POST Auto-Debit Resume Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               uniq_ref_id:
 *                 type: string
 *                 example: "4243846988303"
 *               operation:
 *                 type: string
 *                 example: "RES"
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
appsAndMobileRoutes.post('/auto-debit/resume', (req, res) => {
  res.status(StatusCodes.OK).send({
    profile:{
    "amount": "0.10",
    "callback_url": "http://localhost/callback_response",
    "cancel_date": "",
    "completed": false,
    "customer_number": "233595999364",
    "cycle": "Daily",
    "cycle_skip": "Y",
    "end_date": "2023-07-29 10:30:00",
    "nw": "MTN",
    "resumable": "Y",
    "service_id": "abcd",
    "service_name": "Test service",
    "start_date": "2023-07-28 09:00:00",
    "status": "Suspended",
    "subscription_date": "2023-07-24 04:51:50",
    "uniq_ref_id": "8901234567891"
      },
    transactions: [
    {
             "prev_schedule": "",
             "processing_id": "PR65565656",
             "trans_date": "2023-07-24 04:51:50",
             "trans_id": "226566565",
             "trans_msg": "SUCCESS",
             "trans_ref": "Auto Debit",
             "trans_status": "Active"
       }
    ]
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

/**
 * @swagger
 * /api/v1/anm/auto-debit/cancel:
 *   post:
 *     summary: POST Auto-Debit Cancel Request
 *     tags: [Apps and Mobile Sandbox]
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
 *               service_id:
 *                 type: string
 *                 example: "abcd"
 *               uniq_ref_id:
 *                 type: string
 *                 example: "4243846988303"
 *               operation:
 *                 type: string
 *                 example: "CAN"
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
appsAndMobileRoutes.post('/auto-debit/cancel', (req, res) => {
  res.status(StatusCodes.OK).send({
    profile:{
    "amount": "0.10",
    "callback_url": "http://localhost/callback_response",
    "cancel_date": "",
    "completed": false,
    "customer_number": "233595999364",
    "cycle": "Daily",
    "cycle_skip": "Y",
    "end_date": "2023-07-29 10:30:00",
    "nw": "MTN",
    "resumable": "Y",
    "service_id": "abcd",
    "service_name": "Test service",
    "start_date": "2023-07-28 09:00:00",
    "status": "Suspended",
    "subscription_date": "2023-07-24 04:51:50",
    "uniq_ref_id": "8901234567891"
      },
    transactions: [
    {
             "prev_schedule": "",
             "processing_id": "PR65565656",
             "trans_date": "2023-07-24 04:51:50",
             "trans_id": "226566565",
             "trans_msg": "SUCCESS",
             "trans_ref": "Auto Debit",
             "trans_status": "Active"
       }
    ]
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


/**
 * @swagger
 * /api/v1/anm/callback-url:
 *   post:
 *     summary: Add a callback URL
 *     tags: [Apps and Mobile Sandbox]
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
appsAndMobileRoutes.post('/callback-url', (req, res) => {
  res.status(StatusCodes.OK).send( {
    "trans_id": "98765432100",
    "trans_ref": 4243846303,
    "trans_status": "000/01",
    "message": "SUCCESS"
   });
});

/* 

  400 responses
  {
    "trans_id": "98765432100",
    "trans_ref": 4243846303,
    "trans_status": "001/02",
    "message": "FAILED"
  }


*/

export default appsAndMobileRoutes;
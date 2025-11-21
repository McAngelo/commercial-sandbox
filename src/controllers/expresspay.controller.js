import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

/**
 * Health check endpoint
 */
export const getHealthCheck = catchAsync(async (req, res, next) => {
    return res.status(StatusCodes.OK).send('Hello, World!');
});

/**
 * Settlement endpoint - Check account settlement
 */
export const checkSettlement = catchAsync(async (req, res, next) => {
    const { username, 'auth-token': authToken, type, 'reference-number': referenceNumber } = req.body;

    // Validate required fields
    if (!username || !authToken || !type || !referenceNumber) {
        return next(new AppError('Missing required fields: username, auth-token, type, or reference-number', StatusCodes.BAD_REQUEST));
    }

    // Validate type
    if (type !== 'BALANCE') {
        return next(new AppError('Invalid type. Expected: BALANCE', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return settlement information
        return res.status(StatusCodes.OK).json({
            "status": 0,
            "status-text": "Success",
            "balance": 1234,
            "reference-number": referenceNumber,
            "currency": "GHS"
        });
    } catch (error) {
        return next(new AppError('Failed to retrieve settlement information', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Merchant initiates - Submit a new payment transaction
 */
export const merchantInitiates = catchAsync(async (req, res, next) => {
    const {
        'merchant-id': merchantId,
        'api-key': apiKey,
        firstname,
        lastname,
        email,
        phonenumber,
        username,
        accountnumber,
        currency,
        amount,
        'order-id': orderId,
        'redirect-url': redirectUrl
    } = req.body;

    // Validate required fields
    if (!merchantId || !apiKey || !firstname || !lastname || !email || !phonenumber || 
        !username || !accountnumber || !currency || !amount || !orderId || !redirectUrl) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new AppError('Invalid email format', StatusCodes.BAD_REQUEST));
    }

    // Validate amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
        return next(new AppError('Invalid amount. Must be a positive number', StatusCodes.BAD_REQUEST));
    }

    // Validate currency
    if (currency !== 'GHS') {
        return next(new AppError('Invalid currency. Only GHS is supported', StatusCodes.BAD_REQUEST));
    }

    // Validate redirect URL
    try {
        new URL(redirectUrl);
    } catch (error) {
        return next(new AppError('Invalid redirect-url format', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return transaction details
        return res.status(StatusCodes.OK).json({
            "status": 1,
            "order-id": orderId,
            "guest-checkout": "TRUE",
            "merchantservice-title": "nn_ventures",
            "merchantservice-srvrtid": "906962986353",
            "message": "Success",
            "token": "316152c48865d04e73.2568619f619f52c4d04ec2.177113153192653f52c4d0",
            "redirect-url": redirectUrl,
            "user-key": null,
            "merchant-title": "NN VENTURES",
            "merchant-mcc": "5411",
            "merchant-city": "Accra",
            "merchant-countrycode": "GH"
        });
    } catch (error) {
        return next(new AppError('Failed to process transaction', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Merchant query - Query a transaction status
 */
export const merchantQuery = catchAsync(async (req, res, next) => {
    const {
        'merchant-id': merchantId,
        'api-key': apiKey,
        token
    } = req.body;

    // Validate required fields
    if (!merchantId || !apiKey || !token) {
        return next(new AppError('Missing required fields: merchant-id, api-key, or token', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return query results
        return res.status(StatusCodes.OK).json({
            "status": 1,
            "order-id": "90bffe561179ed97",
            "guest-checkout": "TRUE",
            "merchantservice-title": "nn_ventures",
            "merchantservice-srvrtid": "906962986353",
            "message": "Success",
            "token": token,
            "redirect-url": "https://google.com",
            "user-key": null,
            "merchant-title": "NN VENTURES",
            "merchant-mcc": "5411",
            "merchant-city": "Accra",
            "merchant-countrycode": "GH"
        });
    } catch (error) {
        return next(new AppError('Failed to query transaction', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Merchant Direct Initiates - Submit a minimal payment request
 */
export const merchantDirectInitiates = catchAsync(async (req, res, next) => {
    const {
        'merchant-id': merchantId,
        'api-key': apiKey,
        currency,
        amount,
        'order-id': orderId,
        'post-url': postUrl
    } = req.body;

    // Validate required fields
    if (!merchantId || !apiKey || !currency || !amount || !orderId || !postUrl) {
        return next(new AppError('Missing required fields: merchant-id, api-key, currency, amount, order-id, or post-url', StatusCodes.BAD_REQUEST));
    }

    // Validate amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
        return next(new AppError('Invalid amount. Must be a positive number', StatusCodes.BAD_REQUEST));
    }

    // Validate currency
    if (currency !== 'GHS') {
        return next(new AppError('Invalid currency. Only GHS is supported', StatusCodes.BAD_REQUEST));
    }

    // Validate post URL
    try {
        new URL(postUrl);
    } catch (error) {
        return next(new AppError('Invalid post-url format', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return minimal payment response
        return res.status(StatusCodes.OK).json({
            "status": 1,
            "order-id": orderId,
            "token": "787461ded46931a485.1096669161ded46931a5f8.35327262396661ded46931"
        });
    } catch (error) {
        return next(new AppError('Failed to process payment request', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Merchant Direct Card Payment - Submit card payment details
 */
export const merchantDirectCardPayment = catchAsync(async (req, res, next) => {
    const {
        token,
        'card-number': cardNumber,
        'card-holder-name': cardHolderName,
        'card-expiry': cardExpiry,
        'card-cvv': cardCvv,
        'card-address': cardAddress,
        'card-city': cardCity,
        'card-state': cardState,
        'card-zipcode': cardZipcode,
        'card-country': cardCountry
    } = req.body;

    // Validate required fields
    if (!token || !cardNumber || !cardHolderName || !cardExpiry || !cardCvv || 
        !cardAddress || !cardCity || !cardState || !cardZipcode || !cardCountry) {
        return next(new AppError('Missing required card payment fields', StatusCodes.BAD_REQUEST));
    }

    // Validate CVV (should be 3 or 4 digits)
    if (!/^\d{3,4}$/.test(cardCvv)) {
        return next(new AppError('Invalid CVV format. Must be 3 or 4 digits', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return card payment response
        return res.status(StatusCodes.OK).json({
            "result": 3,
            "result-text": "No transaction data available",
            "order-id": "90bffe561179ed97",
            "token": token,
            "currency": "GHS",
            "amount": "33.00",
            "pmt-info": {
                "bin": "233244",
                "type": "card",
                "name": "",
                "country": ""
            }
        });
    } catch (error) {
        return next(new AppError('Failed to process card payment', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Merchant Direct MoMo Payment - Submit mobile money authorization details
 */
export const merchantDirectMomoPayment = catchAsync(async (req, res, next) => {
    const {
        token,
        'mobile-number': mobileNumber,
        'mobile-network': mobileNetwork,
        'mobile-auth-token': mobileAuthToken
    } = req.body;

    // Validate required fields
    if (!token || !mobileNumber || !mobileNetwork || !mobileAuthToken) {
        return next(new AppError('Missing required fields: token, mobile-number, mobile-network, or mobile-auth-token', StatusCodes.BAD_REQUEST));
    }

    // Validate mobile number format (Ghana format)
    if (!/^0\d{9}$/.test(mobileNumber)) {
        return next(new AppError('Invalid mobile number format. Expected format: 0XXXXXXXXX', StatusCodes.BAD_REQUEST));
    }

    // Validate mobile network
    const validNetworks = ['MTN', 'VODAFONE', 'AIRTELTIGO'];
    if (!validNetworks.includes(mobileNetwork.toUpperCase())) {
        return next(new AppError('Invalid mobile network. Supported: MTN, VODAFONE, AIRTELTIGO', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return mobile money payment response
        return res.status(StatusCodes.OK).json({
            "result": 1,
            "result-text": "Approved",
            "order-id": "49039ruuir",
            "token": token,
            "transaction-id": "906962986353",
            "currency": "GHS",
            "amount": 25,
            "date-processed": new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        });
    } catch (error) {
        return next(new AppError('Failed to process mobile money payment', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Merchant Direct Query - Query a transaction status
 */
export const merchantDirectQuery = catchAsync(async (req, res, next) => {
    const {
        'merchant-id': merchantId,
        'api-key': apiKey,
        token
    } = req.body;

    // Validate required fields
    if (!merchantId || !apiKey || !token) {
        return next(new AppError('Missing required fields: merchant-id, api-key, or token', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return transaction status
        return res.status(StatusCodes.OK).json({
            "result": 1,
            "result-text": "Success",
            "order-id": "2c7bb737-fda8-4f4f-ae9d-b406f17ae48f",
            "token": token,
            "currency": "GHS",
            "amount": "33.00",
            "auth-code": "66978189xc01c",
            "transaction-id": "50d63406udd14",
            "date-processed": new Date().toISOString().replace('T', ' ').substring(0, 19)
        });
    } catch (error) {
        return next(new AppError('Failed to query transaction status', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Tokenize Initiates - Submit a payment request with tokenization
 */
export const tokenizeInitiates = catchAsync(async (req, res, next) => {
    const {
        'merchant-id': merchantId,
        'api-key': apiKey,
        firstname,
        lastname,
        email,
        phonenumber,
        username,
        accountnumber,
        currency,
        'payment-tokenize': paymentTokenize,
        amount,
        'order-id': orderId,
        'redirect-url': redirectUrl
    } = req.body;

    // Validate required fields
    if (!merchantId || !apiKey || !firstname || !lastname || !email || !phonenumber || 
        !username || !accountnumber || !currency || !paymentTokenize || !amount || !orderId || !redirectUrl) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new AppError('Invalid email format', StatusCodes.BAD_REQUEST));
    }

    // Validate amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
        return next(new AppError('Invalid amount. Must be a positive number', StatusCodes.BAD_REQUEST));
    }

    // Validate payment-tokenize
    if (paymentTokenize !== 'TRUE' && paymentTokenize !== 'FALSE') {
        return next(new AppError('Invalid payment-tokenize value. Must be TRUE or FALSE', StatusCodes.BAD_REQUEST));
    }

    // Validate redirect URL
    try {
        new URL(redirectUrl);
    } catch (error) {
        return next(new AppError('Invalid redirect-url format', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return tokenized payment response
        return res.status(StatusCodes.OK).json({
            "status": 1,
            "order-id": orderId,
            "guest-checkout": "TRUE",
            "merchantservice-name": "nn_ventures",
            "merchantservice-srvrtid": "906948373709",
            "message": "Success",
            "token": "996662068692c05931.4763323962068692c05981.12431661976162068692c0",
            "redirect-url": redirectUrl,
            "user-key": null,
            "merchant-name": "NN VENTURES",
            "merchant-mcc": "5411",
            "merchant-city": "Accra",
            "merchant-countrycode": "GH"
        });
    } catch (error) {
        return next(new AppError('Failed to process tokenized payment', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Tokenize Charge - Submit a payment using token
 */
export const tokenizeCharge = catchAsync(async (req, res, next) => {
    const { token, cctoken } = req.body;

    // Validate required fields
    if (!token || !cctoken) {
        return next(new AppError('Missing required fields: token or cctoken', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return charge response
        return res.status(StatusCodes.OK).json({
            "result": 1,
            "result-text": "Success",
            "order-id": 12394,
            "token": token,
            "currency": "GHS",
            "amount": 121,
            "auth-code": "d6c40466x6add",
            "transaction-id": "7b198d0euewre",
            "date-processed": new Date().toLocaleDateString('en-US')
        });
    } catch (error) {
        return next(new AppError('Failed to process charge with token', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Tokenize Query - Query transaction details using token
 */
export const tokenizeQuery = catchAsync(async (req, res, next) => {
    const {
        'merchant-id': merchantId,
        'api-key': apiKey,
        token
    } = req.body;

    // Validate required fields
    if (!merchantId || !apiKey || !token) {
        return next(new AppError('Missing required fields: merchant-id, api-key, or token', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return tokenize query response
        return res.status(StatusCodes.OK).json({
            "result": 1,
            "result-text": "Success",
            "order-id": 12394,
            "token": token,
            "currency": "GHS",
            "amount": 121,
            "date-processed": new Date().toLocaleDateString('en-US'),
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
    } catch (error) {
        return next(new AppError('Failed to query tokenized transaction', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Invoice Dynamic - Create a dynamic invoice
 */
export const invoiceDynamic = catchAsync(async (req, res, next) => {
    const {
        'merchant-id': merchantId,
        'api-key': apiKey,
        amount,
        accountnumber,
        'merchant-reference': merchantReference,
        description,
        'valid-until': validUntil,
        'redirect-url': redirectUrl,
        'post-url': postUrl
    } = req.body;

    // Validate required fields
    if (!merchantId || !apiKey || !amount || !accountnumber || !merchantReference || 
        !description || !validUntil || !redirectUrl || !postUrl) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Validate amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
        return next(new AppError('Invalid amount. Must be a positive number', StatusCodes.BAD_REQUEST));
    }

    // Validate URLs
    try {
        new URL(redirectUrl);
        new URL(postUrl);
    } catch (error) {
        return next(new AppError('Invalid URL format for redirect-url or post-url', StatusCodes.BAD_REQUEST));
    }

    // Validate date format (DD/MM/YYYY)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(validUntil)) {
        return next(new AppError('Invalid date format for valid-until. Expected: DD/MM/YYYY', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return dynamic invoice response
        return res.status(StatusCodes.OK).json({
            "status": 1,
            "message": "Dynamic invoice successfully created",
            "url": "http://sandbox.expresspaygh.com/inv/340"
        });
    } catch (error) {
        return next(new AppError('Failed to create dynamic invoice', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Invoice Token Query - Query transaction status using token
 */
export const invoiceTokenQuery = catchAsync(async (req, res, next) => {
    const {
        'merchant-id': merchantId,
        'api-key': apiKey,
        token
    } = req.body;

    // Validate required fields
    if (!merchantId || !apiKey || !token) {
        return next(new AppError('Missing required fields: merchant-id, api-key, or token', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return invoice query response
        return res.status(StatusCodes.OK).json({
            "result": 1,
            "result-text": "Success",
            "order-id": "inv.5262621e2df549a018.75350242621e2",
            "token": token,
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
            "date-processed": new Date().toISOString().replace('T', ' ').substring(0, 19)
        });
    } catch (error) {
        return next(new AppError('Failed to query invoice transaction', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Billpay Services - Retrieve available services
 */
export const billpayServices = catchAsync(async (req, res, next) => {
    const {
        username,
        'auth-token': authToken,
        type
    } = req.body;

    // Validate required fields
    if (!username || !authToken || !type) {
        return next(new AppError('Missing required fields: username, auth-token, or type', StatusCodes.BAD_REQUEST));
    }

    // Validate type
    if (type !== 'SERVICES') {
        return next(new AppError('Invalid type. Expected: SERVICES', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return available services
        return res.status(StatusCodes.OK).json({
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
    } catch (error) {
        return next(new AppError('Failed to retrieve services', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Billpay Query - Query account or service information
 */
export const billpayQuery = catchAsync(async (req, res, next) => {
    const {
        username,
        'auth-token': authToken,
        type,
        service,
        'account-number': accountNumber,
        'reference-number': referenceNumber
    } = req.body;

    // Validate required fields
    if (!username || !authToken || !type || !service || !accountNumber || !referenceNumber) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Validate type
    if (type !== 'QUERY') {
        return next(new AppError('Invalid type. Expected: QUERY', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return query results
        return res.status(StatusCodes.OK).json({
            "status": 0,
            "status-text": "Success",
            "reference-number": referenceNumber,
            "account-info": accountNumber,
            "options": [
                {
                    "title": "1.5GB Data Package",
                    "package": "HUGE Dealz",
                    "amount": 20,
                    "currency": "GHS",
                    "due-date": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')
                }
            ]
        });
    } catch (error) {
        return next(new AppError('Failed to query account information', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Billpay Pay - Initiate a bill payment
 */
export const billpayPay = catchAsync(async (req, res, next) => {
    const {
        username,
        'auth-token': authToken,
        type,
        service,
        'account-number': accountNumber,
        'reference-number': referenceNumber,
        package: packageName,
        currency,
        amount,
        'payer-name': payerName
    } = req.body;

    // Validate required fields
    if (!username || !authToken || !type || !service || !accountNumber || 
        !referenceNumber || !packageName || !currency || !amount || !payerName) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Validate type
    if (type !== 'PAY') {
        return next(new AppError('Invalid type. Expected: PAY', StatusCodes.BAD_REQUEST));
    }

    // Validate amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
        return next(new AppError('Invalid amount. Must be a positive number', StatusCodes.BAD_REQUEST));
    }

    // Validate currency
    if (currency !== 'GHS') {
        return next(new AppError('Invalid currency. Only GHS is supported', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return payment response
        return res.status(StatusCodes.OK).json({
            "status": 0,
            "status-text": "Success",
            "reference-number": referenceNumber,
            "balance": "4354.64",
            "currency": currency,
            "transaction-id": "8ff5c326u6cba",
            "receipt-number": "",
            "timestamp": new Date().toISOString().replace(/[-:]/g, '').replace('T', '').substring(0, 14)
        });
    } catch (error) {
        return next(new AppError('Failed to process bill payment', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

/**
 * Billpay Status - Check transaction status
 */
export const billpayStatus = catchAsync(async (req, res, next) => {
    const {
        username,
        'auth-token': authToken,
        type,
        'reference-number': referenceNumber,
        'transaction-id': transactionId
    } = req.body;

    // Validate required fields
    if (!username || !authToken || !type || !referenceNumber || !transactionId) {
        return next(new AppError('Missing required fields: username, auth-token, type, reference-number, or transaction-id', StatusCodes.BAD_REQUEST));
    }

    // Validate type
    if (type !== 'STATUS') {
        return next(new AppError('Invalid type. Expected: STATUS', StatusCodes.BAD_REQUEST));
    }

    try {
        // Return transaction status
        return res.status(StatusCodes.OK).json({
            "status": 0,
            "status-text": "Success",
            "reference-number": referenceNumber,
            "transaction-id": transactionId,
            "timestamp": new Date().toISOString().replace('T', ' ').substring(0, 19)
        });
    } catch (error) {
        return next(new AppError('Failed to retrieve transaction status', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});


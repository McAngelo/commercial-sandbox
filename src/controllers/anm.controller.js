import {StatusCodes} from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

/**
 * Health check endpoint
 */
export const getHealthCheck = catchAsync(async (req, res, next) => {
    return res.status(StatusCodes.OK).send('Hello, World!');
});

/**
 * Check Wallet Balance
 */
export const checkWalletBalance = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, trans_type, ts } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !trans_type || !ts) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Return wallet balance
    return res.status(StatusCodes.OK).json({
        sms_bal: 56,
        payout_bal: 3.72,
        billpay_bal: 4.4,
        available_collect_bal: 359.765,
        airtime_bal: 30.9,
        actual_collect_bal: 359.765
    });
});

/**
 * Check Transaction
 */
export const checkTransaction = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, trans_type, exttrid } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !trans_type || !exttrid) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Return transaction status
    return res.status(StatusCodes.OK).json({
        trans_status: '000/01',
        trans_ref: exttrid,
        trans_id: '21870173572',
        message: 'SUCCESSFUL'
    });
});

/**
 * Send SMS
 */
export const sendSms = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, trans_type, sender_id, recipient_number, msg_type, msg_body, unique_id } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !trans_type || !sender_id || !recipient_number || !msg_type || !msg_body) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate phone number format
    if (!recipient_number.startsWith('233') || recipient_number.length < 12) {
        return next(new AppError('Invalid recipient phone number format', StatusCodes.BAD_REQUEST));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        resp_desc: 'Message successfully queued for delivery',
        resp_code: '082'
    });
});

/**
 * Debit Credit Send Request
 */
export const debitCreditSendRequest = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, trans_type, customer_number, amount, nw, reference, callback_url, exttrid, ts } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !trans_type || !customer_number || !amount || !nw || !exttrid) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        return next(new AppError('Invalid amount', StatusCodes.BAD_REQUEST));
    }

    // Simulate insufficient balance check (example: if amount > 1000)
    if (numAmount > 10000) {
        return next(new AppError('Insufficient balance to process request', StatusCodes.PAYMENT_REQUIRED));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        resp_desc: 'Request successfully received for processing',
        resp_code: '015'
    });
});

/**
 * Air Time Topup Send Request
 */
export const airTimeTopupSendRequest = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, trans_type, customer_number, amount, nw, reference, callback_url, exttrid, ts } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !trans_type || !customer_number || !amount || !nw || !exttrid) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        return next(new AppError('Invalid amount', StatusCodes.BAD_REQUEST));
    }

    // Simulate insufficient balance check
    if (numAmount > 10000) {
        return next(new AppError('Insufficient balance to process request', StatusCodes.PAYMENT_REQUIRED));
    }

    // Validate network
    const validNetworks = ['MTN', 'VOD', 'ATL', 'GLO'];
    if (!validNetworks.includes(nw)) {
        return next(new AppError('Invalid network provider', StatusCodes.BAD_REQUEST));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        resp_desc: 'Request successfully received for processing',
        resp_code: '015'
    });
});

/**
 * Bill Payment Send Request
 */
export const billPaymentSendRequest = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, trans_type, acount_number, amount, nw, callback_url, exttrid, ts } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !trans_type || !acount_number || !amount || !nw || !exttrid) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        return next(new AppError('Invalid amount', StatusCodes.BAD_REQUEST));
    }

    // Simulate insufficient balance check
    if (numAmount > 10000) {
        return next(new AppError('Insufficient balance to process request', StatusCodes.PAYMENT_REQUIRED));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        resp_desc: 'Request successfully completed',
        resp_code: '027'
    });
});

/**
 * GHIPSS Payment Send Request
 */
export const ghipssPaymentSendRequest = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, trans_type, landing_page, amount, nw, callback_url, exttrid, ts } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !trans_type || !landing_page || !amount || !exttrid) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        return next(new AppError('Invalid amount', StatusCodes.BAD_REQUEST));
    }

    // Simulate insufficient balance check
    if (numAmount > 10000) {
        return next(new AppError('Insufficient balance to process request', StatusCodes.PAYMENT_REQUIRED));
    }

    // Return success response with form details
    return res.status(StatusCodes.OK).json({
        resp_code: '000',
        form_url: 'https://gigs-test.ghipss.com:7543/EcomPayment/RedirectAuthLink',
        form_details: {
            MerID: '123',
            AcqID: '315',
            OrderID: '6582',
            MerRespURL: 'https://appsnmobileagent.com:8215/return_resp',
            PurchaseAmt: '000100',
            PurchaseCurrency: 936,
            PurchaseCurrencyExponent: 2,
            CaptureFlag: 'A',
            Signature: 'IAANKxiU=',
            SignatureMethod: 'SHA1',
            Version: '1.0.0'
        }
    });
});

/**
 * Account Inquiry Send Request
 */
export const accountInquirySendRequest = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, trans_type, customer_number, nw, bank_code, exttrid, ts } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !trans_type || !customer_number || !nw || !exttrid) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        resp_code: '027',
        resp_desc: 'Request successfully completed',
        name: 'John Doe'
    });
});

/**
 * Verify ID
 */
export const verifyId = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, id_num, id_type, image, exttrid } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !id_num || !id_type || !exttrid) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate ID type
    const validIdTypes = ['GCA', 'VID', 'SSN', 'PAS', 'DLI'];
    if (!validIdTypes.includes(id_type)) {
        return next(new AppError('Invalid ID type', StatusCodes.BAD_REQUEST));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        resp_code: '027',
        resp_desc: 'Request successfully completed',
        data: {
            name: 'XXXXXX',
            gender: 'M',
            verified: 'true',
            card_valid_start: '2022-01-01',
            card_valid_end: '2028-01-02'
        }
    });
});

/**
 * Remittance Send Request
 */
export const remittanceSendRequest = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { 
        service_id, trans_type, customer_number, nw, sender_name, sender_number,
        sender_gender, recipient_name, recipient_address, recipient_gender,
        transf_curr_code, ctry_origin_code, transf_amount, amount,
        transf_purpose, callback_url, exttrid, ts 
    } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !trans_type || !customer_number || !nw || !sender_name || 
        !recipient_name || !transf_amount || !amount || !exttrid) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate amounts
    const numTransfAmount = parseFloat(transf_amount);
    const numAmount = parseFloat(amount);
    if (isNaN(numTransfAmount) || numTransfAmount <= 0 || isNaN(numAmount) || numAmount <= 0) {
        return next(new AppError('Invalid amount', StatusCodes.BAD_REQUEST));
    }

    // Simulate insufficient balance check
    if (numAmount > 10000) {
        return next(new AppError('Insufficient balance to process request', StatusCodes.PAYMENT_REQUIRED));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        resp_desc: 'Request successfully received for processing',
        resp_code: '015'
    });
});

/**
 * Third Party Payment Request
 */
export const thirdPartyRequest = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { 
        service_id, nickname, landing_page, currency_code, currency_val,
        amount, payment_mode, reference, callback_url, exttrid, ts 
    } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !nickname || !landing_page || !amount || !payment_mode || !exttrid) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        return next(new AppError('Invalid amount', StatusCodes.BAD_REQUEST));
    }

    // Simulate insufficient balance check
    if (numAmount > 10000) {
        return next(new AppError('Insufficient balance to process request', StatusCodes.PAYMENT_REQUIRED));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        resp_code: '000',
        resp_desc: 'Passed',
        redirect_url: 'https://payments.anmgw.com/payment_page?code=dG9rZW49NDM3MTkwMjIyMTMxNzk5OSZ0cmFuc19pZD02NDYxOTAyMjIxMzE3OTIxNjI2=='
    });
});

/**
 * Auto-Debit Subscription
 */
export const autoDebitSubscription = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { 
        service_id, nw, customer_number, cycle, resumable, amount,
        cycle_skip, reference, return_url, uniq_ref_id, start_date,
        end_date, operation, apply_penalty 
    } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !nw || !customer_number || !cycle || !amount || !uniq_ref_id || !operation) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        return next(new AppError('Invalid amount', StatusCodes.BAD_REQUEST));
    }

    // Validate cycle
    const validCycles = ['DLY', 'WKY', 'MTY', 'YRY'];
    if (!validCycles.includes(cycle)) {
        return next(new AppError('Invalid cycle value', StatusCodes.BAD_REQUEST));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        profile: {
            amount: numAmount.toFixed(2),
            callback_url: return_url || 'http://localhost/callback_response',
            cancel_date: '',
            completed: false,
            customer_number: customer_number,
            cycle: 'Daily',
            cycle_skip: cycle_skip || 'N',
            end_date: end_date || '2023-07-29 10:30:00',
            nw: nw,
            resumable: resumable || 'Y',
            service_id: service_id,
            service_name: 'Test service',
            start_date: start_date || '2023-07-28 09:00:00',
            status: 'Active',
            subscription_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            uniq_ref_id: uniq_ref_id
        },
        transactions: [
            {
                prev_schedule: '',
                processing_id: 'PR65565656',
                trans_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                trans_id: '226566565',
                trans_msg: 'SUCCESS',
                trans_ref: 'Auto Debit',
                trans_status: 'Active'
            }
        ]
    });
});

/**
 * Auto-Debit OTP Validation
 */
export const autoDebitOtpValidation = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, uniq_ref_id, operation, otp_code } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !uniq_ref_id || !operation) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Simulate OTP validation (if otp_code is provided)
    if (otp_code) {
        // Simulate invalid OTP
        if (otp_code !== '123456') {
            return next(new AppError('Invalid OTP code', StatusCodes.NOT_FOUND));
        }
        
        // Simulate expired OTP (if otp_code is '000000')
        if (otp_code === '000000') {
            return next(new AppError('OTP code has expired', StatusCodes.REQUEST_TIMEOUT));
        }
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        profile: {
            amount: '0.10',
            callback_url: 'http://localhost/callback_response',
            cancel_date: '',
            completed: false,
            customer_number: '233595999364',
            cycle: 'Daily',
            cycle_skip: 'Y',
            end_date: '2023-07-29 10:30:00',
            nw: 'MTN',
            resumable: 'Y',
            service_id: service_id,
            service_name: 'Test service',
            start_date: '2023-07-28 09:00:00',
            status: 'Active',
            subscription_date: '2023-07-24 04:51:50',
            uniq_ref_id: uniq_ref_id
        },
        transactions: [
            {
                prev_schedule: '',
                processing_id: 'PR65565656',
                trans_date: '2023-07-24 04:51:50',
                trans_id: '226566565',
                trans_msg: 'SUCCESS',
                trans_ref: 'Auto Debit',
                trans_status: 'Active'
            }
        ]
    });
});

/**
 * Auto-Debit Suspend
 */
export const autoDebitSuspend = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, uniq_ref_id, operation } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !uniq_ref_id || !operation) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate operation
    if (operation !== 'SUS') {
        return next(new AppError('Invalid operation for this endpoint', StatusCodes.BAD_REQUEST));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        profile: {
            amount: '0.10',
            callback_url: 'http://localhost/callback_response',
            cancel_date: '',
            completed: false,
            customer_number: '233595999364',
            cycle: 'Daily',
            cycle_skip: 'Y',
            end_date: '2023-07-29 10:30:00',
            nw: 'MTN',
            resumable: 'Y',
            service_id: service_id,
            service_name: 'Test service',
            start_date: '2023-07-28 09:00:00',
            status: 'Suspended',
            subscription_date: '2023-07-24 04:51:50',
            uniq_ref_id: uniq_ref_id
        },
        transactions: [
            {
                prev_schedule: '',
                processing_id: 'PR65565656',
                trans_date: '2023-07-24 04:51:50',
                trans_id: '226566565',
                trans_msg: 'SUCCESS',
                trans_ref: 'Auto Debit',
                trans_status: 'Suspended'
            }
        ]
    });
});

/**
 * Auto-Debit Resume
 */
export const autoDebitResume = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, uniq_ref_id, operation } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !uniq_ref_id || !operation) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate operation
    if (operation !== 'RES') {
        return next(new AppError('Invalid operation for this endpoint', StatusCodes.BAD_REQUEST));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        profile: {
            amount: '0.10',
            callback_url: 'http://localhost/callback_response',
            cancel_date: '',
            completed: false,
            customer_number: '233595999364',
            cycle: 'Daily',
            cycle_skip: 'Y',
            end_date: '2023-07-29 10:30:00',
            nw: 'MTN',
            resumable: 'Y',
            service_id: service_id,
            service_name: 'Test service',
            start_date: '2023-07-28 09:00:00',
            status: 'Active',
            subscription_date: '2023-07-24 04:51:50',
            uniq_ref_id: uniq_ref_id
        },
        transactions: [
            {
                prev_schedule: '',
                processing_id: 'PR65565656',
                trans_date: '2023-07-24 04:51:50',
                trans_id: '226566565',
                trans_msg: 'SUCCESS',
                trans_ref: 'Auto Debit',
                trans_status: 'Active'
            }
        ]
    });
});

/**
 * Auto-Debit Cancel
 */
export const autoDebitCancel = catchAsync(async (req, res, next) => {
    const { apikey, username } = req.headers;
    const { service_id, uniq_ref_id, operation } = req.body;

    // Validate authentication headers
    if (!apikey || !username) {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate required fields
    if (!service_id || !uniq_ref_id || !operation) {
        return next(new AppError('Missing required fields', StatusCodes.BAD_REQUEST));
    }

    // Simulate authentication check
    if (apikey !== process.env.ANM_API_KEY && apikey !== 'your_api_key_here') {
        return next(new AppError('Invalid API key or username', StatusCodes.UNAUTHORIZED));
    }

    // Validate operation
    if (operation !== 'CAN') {
        return next(new AppError('Invalid operation for this endpoint', StatusCodes.BAD_REQUEST));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        profile: {
            amount: '0.10',
            callback_url: 'http://localhost/callback_response',
            cancel_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            completed: true,
            customer_number: '233595999364',
            cycle: 'Daily',
            cycle_skip: 'Y',
            end_date: '2023-07-29 10:30:00',
            nw: 'MTN',
            resumable: 'N',
            service_id: service_id,
            service_name: 'Test service',
            start_date: '2023-07-28 09:00:00',
            status: 'Cancelled',
            subscription_date: '2023-07-24 04:51:50',
            uniq_ref_id: uniq_ref_id
        },
        transactions: [
            {
                prev_schedule: '',
                processing_id: 'PR65565656',
                trans_date: '2023-07-24 04:51:50',
                trans_id: '226566565',
                trans_msg: 'CANCELLED',
                trans_ref: 'Auto Debit',
                trans_status: 'Cancelled'
            }
        ]
    });
});

/**
 * Callback URL handler
 */
export const callbackUrl = catchAsync(async (req, res, next) => {
    const { businessId, serviceId, callbackUrl } = req.body;

    // Validate required fields
    if (!businessId || !serviceId || !callbackUrl) {
        return next(new AppError('Missing required fields: businessId, serviceId, or callbackUrl', StatusCodes.BAD_REQUEST));
    }

    // Validate URL format
    try {
        new URL(callbackUrl);
    } catch (error) {
        return next(new AppError('Invalid callback URL format', StatusCodes.BAD_REQUEST));
    }

    // Return success response
    return res.status(StatusCodes.OK).json({
        trans_id: '98765432100',
        trans_ref: 4243846303,
        trans_status: '000/01',
        message: 'SUCCESS'
    });
});

export default {
    getHealthCheck,
    checkWalletBalance,
    checkTransaction,
    sendSms,
    debitCreditSendRequest,
    airTimeTopupSendRequest,
    billPaymentSendRequest,
    ghipssPaymentSendRequest,
    accountInquirySendRequest,
    verifyId,
    remittanceSendRequest,
    thirdPartyRequest,
    autoDebitSubscription,
    autoDebitOtpValidation,
    autoDebitSuspend,
    autoDebitResume,
    autoDebitCancel,
    callbackUrl
};


import { StatusCodes } from 'http-status-codes';

/**
 * Controller for Nalo API endpoints
 * Handles business logic and response formatting with proper error handling
 */

/**
 * Get index/health check endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getIndex = (req, res) => {
  try {
    res.status(StatusCodes.OK).send('Hello, World!');
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: 'SERVER-ERROR-5000',
      message: 'An unexpected error occurred',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Generate payment token for Client API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateClientApiPaymentToken = (req, res) => {
  try {
    const { merchant_id } = req.body;

    // Validate required fields
    if (!merchant_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4000',
        message: 'Missing required field: merchant_id'
      });
    }

    // Validate merchant_id format (basic validation)
    if (typeof merchant_id !== 'string' || merchant_id.trim() === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4001',
        message: 'Invalid merchant_id format'
      });
    }

    // Business logic - Generate token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6Im1ucUREaGlTc3I2WThEUHk4RDJYb0QiLCJiYXNpY19hdXRoX2hlYWRlciI6IkJhc2ljIGFjMWMzYWQxNWUxZGNhNzVjOWFlZmY2YzQ3MWNmMjc3MjQwOWRjYzE5NTRlODFiZjIwM2YzYjAzNjk3NDNjNzYwZmE1ODk5N2NmNDBmODI1ZDc1YWNmYzJhMzJlZDlkYzYzNGE4YWRlN2NhOTBlZTU2ZDdiY2IwZGY1MjZiMjViIiwiaWF0IjoxNzU1NTE4NjIyLCJleHAiOjE3NTU1MTk1MjJ9.TCn6Nlpg0LjxbiExmaHG2egkGqsWyz-dc2id8amv-Cg";

    res.status(StatusCodes.OK).json({
      success: true,
      code: 'TOKEN-CRTD-0050',
      data: {
        token
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: 'SERVER-ERROR-5001',
      message: 'Failed to generate payment token',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Initiate a collection request via Client API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const initiateClientApiCollection = (req, res) => {
  try {
    const {
      merchant_id,
      service_name,
      trans_hash,
      account_number,
      account_name,
      description,
      reference,
      network,
      amount,
      callback
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'merchant_id', 'service_name', 'trans_hash', 'account_number',
      'account_name', 'description', 'reference', 'network', 'amount', 'callback'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4002',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4003',
        message: 'Invalid amount. Must be a positive number'
      });
    }

    // Validate network
    const validNetworks = ['MTN', 'VODAFONE', 'AIRTELTIGO'];
    if (!validNetworks.includes(network.toUpperCase())) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4004',
        message: `Invalid network. Must be one of: ${validNetworks.join(', ')}`
      });
    }

    // Validate account_number format (basic)
    if (!/^\d{10}$/.test(account_number)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4005',
        message: 'Invalid account_number. Must be 10 digits'
      });
    }

    // Business logic - Process collection
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    res.status(StatusCodes.OK).json({
      success: true,
      code: 'PAY-CRTD-0055',
      data: {
        order_id: 'FPewDB25nodznJawcNykhx',
        status: 'PENDING',
        amount: parseFloat(amount),
        timestamp,
        otp_code: 'None*252#'
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: 'SERVER-ERROR-5002',
      message: 'Failed to initiate collection',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Check collection status via Client API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const checkClientApiCollectionStatus = (req, res) => {
  try {
    const { merchant_id, order_id } = req.body;

    // Validate required fields
    if (!merchant_id || !order_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4006',
        message: 'Missing required fields: merchant_id and order_id are required'
      });
    }

    // Validate field formats
    if (typeof merchant_id !== 'string' || merchant_id.trim() === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4007',
        message: 'Invalid merchant_id format'
      });
    }

    if (typeof order_id !== 'string' || order_id.trim() === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4008',
        message: 'Invalid order_id format'
      });
    }

    // Business logic - Check status
    res.status(StatusCodes.OK).json({
      success: true,
      code: 'PAY-STAT-0080',
      data: {
        status: 'PENDING',
        amount: 0.11
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: 'SERVER-ERROR-5003',
      message: 'Failed to retrieve collection status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Generate payment token for Hosted Checkout
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateHostedCheckoutPaymentToken = (req, res) => {
  try {
    const { merchant_id } = req.body;

    // Validate required fields
    if (!merchant_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4009',
        message: 'Missing required field: merchant_id'
      });
    }

    // Validate merchant_id format
    if (typeof merchant_id !== 'string' || merchant_id.trim() === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4010',
        message: 'Invalid merchant_id format'
      });
    }

    // Business logic - Generate token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6Im1ucUREaGlTc3I2WThEUHk4RDJYb0QiLCJiYXNpY19hdXRoX2hlYWRlciI6IkJhc2ljIGFjMWMzYWQxNWUxZGNhNzVjOWFlZmY2YzQ3MWNmMjc3MjQwOWRjYzE5NTRlODFiZjIwM2YzYjAzNjk3NDNjNzYwZmE1ODk5N2NmNDBmODI1ZDc1YWNmYzJhMzJlZDlkYzYzNGE4YWRlN2NhOTBlZTU2ZDdiY2IwZGY1MjZiMjViIiwiaWF0IjoxNzU1NTE4NjIyLCJleHAiOjE3NTU1MTk1MjJ9.TCn6Nlpg0LjxbiExmaHG2egkGqsWyz-dc2id8amv-Cg";

    res.status(StatusCodes.OK).json({
      success: true,
      code: 'TOKEN-CRTD-0050',
      data: {
        token
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: 'SERVER-ERROR-5004',
      message: 'Failed to generate payment token',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Create checkout session for Hosted Checkout
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createHostedCheckoutSession = (req, res) => {
  try {
    const { merchant, summary } = req.body;

    // Validate main objects
    if (!merchant || !summary) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4011',
        message: 'Missing required fields: merchant and summary are required'
      });
    }

    // Validate merchant fields
    const requiredMerchantFields = [
      'merchant_id', 'order_id', 'customer_name', 'referral_url',
      'callback_url', 'trans_hash', 'reference', 'mode'
    ];

    const missingMerchantFields = requiredMerchantFields.filter(
      field => !merchant[field]
    );

    if (missingMerchantFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4012',
        message: `Missing required merchant fields: ${missingMerchantFields.join(', ')}`
      });
    }

    // Validate summary fields
    if (!summary.products || !Array.isArray(summary.products)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4013',
        message: 'Invalid summary: products must be an array'
      });
    }

    if (!summary.item_count || !summary.total_price) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4014',
        message: 'Missing required summary fields: item_count and total_price are required'
      });
    }

    // Validate products array
    for (let i = 0; i < summary.products.length; i++) {
      const product = summary.products[i];
      if (!product.name || !product.count || !product.price) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          code: 'VALIDATION-ERROR-4015',
          message: `Invalid product at index ${i}: name, count, and price are required`
        });
      }
    }

    // Validate mode
    const validModes = ['MOMO', 'CARD', 'BANK'];
    if (!validModes.includes(merchant.mode.toUpperCase())) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4016',
        message: `Invalid mode. Must be one of: ${validModes.join(', ')}`
      });
    }

    // Validate URLs
    try {
      new URL(merchant.referral_url);
      new URL(merchant.callback_url);
    } catch (urlError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4017',
        message: 'Invalid URL format for referral_url or callback_url'
      });
    }

    // Business logic - Create checkout session
    res.status(StatusCodes.OK).json({
      success: true,
      code: 'CHECKOUT-CRTD-0071',
      data: {
        checkout_url: 'None?id=84887d1d-b783-49ea-a528-13332e274667',
        checkout_timeout: 1800
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: 'SERVER-ERROR-5005',
      message: 'Failed to create checkout session',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Check collection status via Hosted Checkout
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const checkHostedCheckoutCollectionStatus = (req, res) => {
  try {
    const { merchant_id, order_id } = req.body;

    // Validate required fields
    if (!merchant_id || !order_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4018',
        message: 'Missing required fields: merchant_id and order_id are required'
      });
    }

    // Validate field formats
    if (typeof merchant_id !== 'string' || merchant_id.trim() === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4019',
        message: 'Invalid merchant_id format'
      });
    }

    if (typeof order_id !== 'string' || order_id.trim() === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: 'VALIDATION-ERROR-4020',
        message: 'Invalid order_id format'
      });
    }

    // Business logic - Check status
    res.status(StatusCodes.OK).json({
      success: true,
      code: 'PAY-STAT-0080',
      data: {
        status: 'PENDING',
        amount: 0.11
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: 'SERVER-ERROR-5006',
      message: 'Failed to retrieve collection status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


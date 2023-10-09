'use strict';

const dynamodb = require('../database/dynamodb.js');
const { listInvoice } = require('../core/list.js');

module.exports.list = async (event, context, callback) => {
  try {
    const email = "johndoe@example.com"

    const invoices = await listInvoice(email, dynamodb);
    
    return {
      statusCode: 200,
      body: JSON.stringify(invoices),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: error.message,
    };
  }
};

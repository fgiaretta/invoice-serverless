'use strict';

const dynamodb = require('../database/dynamodb.js');
const { listInvoice } = require('../core/list.js');

module.exports.list = async (event, context, callback) => {
  try {
    const owner = event.requestContext.authorizer.claims.email;

    const invoices = await listInvoice(owner, dynamodb);
    
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

'use strict';

const mongodb = require('../database/mongodb.js');
const { listInvoice } = require('../core/list.js');

module.exports.list = async (event, context, callback) => {
  try {
    const email = "johndoe@example.com"

    const invoices = await listInvoice(email, mongodb);
    const response = {
      statusCode: 200,
      body: JSON.stringify(invoices),
    };
    return response;
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: error.message,
    };
  }
};

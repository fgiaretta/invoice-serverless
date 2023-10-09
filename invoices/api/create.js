'use strict';

const mongodb = require('../database/mongodb.js');
const { createInvoice } = require('../core/create.js');

module.exports.create = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    
    const createdInvoice = await createInvoice(data, mongodb);
    const response = {
      statusCode: 200,
      body: JSON.stringify(createdInvoice),
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
'use strict';

const mongodb = require('../database/mongodb.js');
const { updateInvoice } = require('../core/update.js');

module.exports.create = async (event, context) => {
  try {
    const {dueDate, status} = JSON.parse(event.body);
    const id = event.pathParameters.id;
    
    const updatedInvoice = await updateInvoice(id, dueDate, status, mongodb);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedInvoice),
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
'use strict';

const mongodb = require('../database/mongodb.js');
const { deleteInvoice } = require('../core/delete.js');

module.exports.delete = async (event, context) => {
  try {
    const id = event.pathParameters.id
    
    const deletedInvoice = await deleteInvoice(id, mongodb);

    return {
      statusCode: 200,
      body: JSON.stringify(deletedInvoice),
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
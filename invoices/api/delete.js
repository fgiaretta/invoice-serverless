'use strict';

const dynamodb = require('../database/dynamodb.js');
const { deleteInvoice } = require('../core/delete.js');

module.exports.delete = async (event, context) => {
  try {
    const id = event.pathParameters.id;
    const email = event.requestContext.authorizer.claims.email;
    
    const deletedInvoice = await deleteInvoice(id, dynamodb);

    return {
      statusCode: 200,
      body: JSON.stringify({status: deletedInvoice ? 'success' : 'failure' }),
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

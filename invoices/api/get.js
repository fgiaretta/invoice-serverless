'use strict';

const dynamodb = require('../database/dynamodb.js');
const { getInvoice } = require('../core/get.js');

module.exports.get = async (event, context) => {
  try {
    const id = event.pathParameters.id;
    const owner = event.requestContext.authorizer.claims.email;

    const invoice = await getInvoice(id, owner, dynamodb);

    return {
      statusCode: 200,
      body: JSON.stringify(invoice)
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
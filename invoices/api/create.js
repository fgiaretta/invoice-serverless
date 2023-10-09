'use strict';

const dynamodb = require('../database/dynamodb.js');
const { createInvoice } = require('../core/create.js');

module.exports.create = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    const owner = event.requestContext.authorizer.claims.email;

    data.owner = owner;

    const createdInvoice = await createInvoice(data, dynamodb);

    return {
      statusCode: 200,
      body: JSON.stringify(createdInvoice),
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

"use strict";

const dynamodb = require("../database/dynamodb.js");
const { updateInvoice } = require("../core/update.js");

module.exports.update = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;

    const updatedInvoice = await updateInvoice(id, body, dynamodb);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedInvoice),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: error.message,
    };
  }
};

'use strict';

const { updateInvoice } = require('./database');

function validateData(data) {
  if (!data.duedate || !data.status) {
    console.error('Validation Failed');
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the invoice item.',
    };
  }
}

module.exports.update = async (event, context) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const validationError = validateData(data);
  if (validationError) {
    return validationError;
  }

  const id = event.pathParameters.id;
  const { duedate, status } = data;

  try {
    const updatedInvoice = await updateInvoice(id, { duedate, status, updatedAt: timestamp });
    const response = {
      statusCode: 200,
      body: JSON.stringify(updatedInvoice),
    };
    return response;
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the invoice item.',
    };
  }
};

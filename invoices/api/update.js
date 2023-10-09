'use strict';

const { getInvoiceById, updateInvoice } = require('../database/database');
const { validateEdit } = require('../input/invoice');

module.exports.update = async (event, context) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const validationError = validateEdit(data);

  if (validationError) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: validationError.message,
    };
  }

  const id = event.pathParameters.id;
  const { dueDate, status } = data;

  try {
    const existingInvoice = await getInvoiceById(id);
    if (!existingInvoice) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Invoice not found.',
      };
    }

    const updatedInvoice = await updateInvoice(id, { dueDate, status, updatedAt: timestamp });
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

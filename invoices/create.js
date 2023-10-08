'use strict';

const uuid = require('uuid');
const { createInvoice } = require('./database.js');

function validateData(data) {
  if (!data.invoiceNumber || !data.client || !data.client.name || !data.client.phone || !data.client.email || !data.items || !data.dueDate || !data.status) {
    console.error('Validation Failed');
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the invoice item.',
    };
  }
}

module.exports.create = async (event, context) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const validationError = validateData(data);
  if (validationError) {
    return validationError;
  }

  const params = {
    id: uuid.v1(),
    invoiceNumber: data.invoiceNumber,
    client: {
      name: data.client.name,
      phone: data.client.phone,
      email: data.client.email,
    },
    items: data.items.map(item => ({
      value: item.value,
      description: item.description,
      time: item.time
    })),
    dueDate: data.dueDate,
    status: data.status,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  try {
    const createdInvoice = await createInvoice(params);
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
      body: 'Could not create invoice.',
    };
  }
};

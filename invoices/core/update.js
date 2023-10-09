'use strict';

const { validateEdit } = require("../input/invoice.js");

module.exports.updateInvoice = async (id, owner, data, db) => {
  const timestamp = new Date().getTime();

  const { dueDate, status } = data;

  const validationError = validateEdit(dueDate, status);
  if (validationError) {
    throw new Error(validationError.message);
  }

  try {
    const existingInvoice = await db.getInvoiceById(id);

    if (!existingInvoice || existingInvoice.owner !== owner) {
      throw new Error('Invoice not found or you are not the owner');
    }

    return await db.updateInvoice(id, {
      dueDate,
      status,
      updatedAt: timestamp,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't update the invoice item.");
  }
};
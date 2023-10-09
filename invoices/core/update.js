'use strict';

const { validateEdit } = require("../input/invoice.js");

module.exports.updateInvoice = async (id, owner, data, messenger, db) => {
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

    const updatedInvoice = await db.updateInvoice(id, {
      dueDate,
      status,
      updatedAt: timestamp,
    });

    if (existingInvoice.status !== updatedInvoice.status) {
      const message = `The status of invoice ${id} has been updated from [${existingInvoice.status}] to [${updatedInvoice.status}].`;
      await messenger.sendMessage(message);
    }

    return updatedInvoice;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't update the invoice item.");
  }
};
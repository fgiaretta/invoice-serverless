"use strict";

const { validateEdit } = require("../input/invoice.js");

module.exports.updateInvoice = async (id, dueDate, status, db) => {
  const timestamp = new Date().getTime();

  const validationError = validateEdit(dueDate, status);
  if (validationError) {
    throw new Error(validationError.message);
  }

  try {
    const existingInvoice = await db.getInvoiceById(id);
    if (!existingInvoice) {
      throw new Error("Invoice not found.");
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
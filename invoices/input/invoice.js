"use strict";

function validateStatus(status) {
    if (status && !["paid", "pending", "due"].includes(status)) {
        throw new Error("Invalid status value.");
    }
}

function validateEdit(dueDate, status) {
    if (!dueDate && !status) {
        throw new Error("Couldn't update the invoice item.");
    }
    validateStatus(status);
}

function validateAdd(data) {
    if (
        !data.invoiceNumber ||
        !data.client ||
        !data.client.name ||
        !data.client.phone ||
        !data.client.email ||
        !data.items ||
        !data.dueDate ||
        !data.status
    ) {
        throw new Error("Couldn't create the invoice item.");
    }

    validateStatus(data.status);
}
module.exports = {
    validateEdit,
    validateAdd
};

'use strict';

const uuid = require('uuid');
const { validateInput } = require('../input/invoice.js');

module.exports.createInvoice = async (data, db) => {
    const timestamp = new Date().getTime();

    const validationError = validateInput(data);
    if (validationError) {
        throw new Error(validationError.message);
    }

    const params = {
        id: uuid.v1(),
        invoiceNumber: data.invoiceNumber,
        owner: data.owner,
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

    return await db.createInvoice(params);
};

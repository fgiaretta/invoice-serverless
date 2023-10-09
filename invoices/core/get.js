'use strict';

module.exports.getInvoice = async (id, db) => {
    return await db.getInvoiceById(id);
};

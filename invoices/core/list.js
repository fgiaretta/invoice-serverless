'use strict';

module.exports.listInvoice = async (email, db) => {
    return await db.listInvoices(email);
};

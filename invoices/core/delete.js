'use strict';

module.exports.deleteInvoice = async (id, db) => {
    return await db.deleteInvoice(id);
};

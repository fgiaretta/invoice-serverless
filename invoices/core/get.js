'use strict';

module.exports.getInvoice = async (id, owner, db) => {
    const invoice = await db.getInvoiceById(id);
    
    if (invoice && invoice.owner === owner) {
        return invoice;
    } else {
        throw new Error('Invoice not found or you are not the owner');
    }
};

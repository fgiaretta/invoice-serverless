'use strict';

module.exports.deleteInvoice = async (id, owner, db) => {
    const invoice = await db.getInvoiceById(id);
    
    if (invoice && invoice.owner === owner) {
        return await db.deleteInvoice(id);
    } else {
        throw new Error('Invoice not found or you are not the owner');
    }
};

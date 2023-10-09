'use strict';

const sinon = require('sinon');
const { expect } = require('chai');
const { createInvoice } = require('../invoices/database/dynamodb.js');
const { validateInput } = require('../invoices/input/invoice.js');

describe('createInvoice', () => {
  let db;
  let data;

  beforeEach(() => {
    db = {
      invoices: [],
      createInvoice: sinon.stub().callsFake((invoice) => {
        db.invoices.push(invoice);
      }),
    };
    data = {
      invoiceNumber: 'INV-001',
      client: {
        name: 'John Doe',
        phone: '555-555-5555',
        email: 'john.doe@example.com',
      },
      items: [
        {
          value: 100,
          description: 'Item 1',
          time: 1,
        },
        {
          value: 200,
          description: 'Item 2',
          time: 2,
        },
      ],
      dueDate: new Date(),
      status: 'draft',
    };
  });

  it('should create an invoice', async () => {
    const result = await createInvoice(data, db);

    expect(result).to.be.undefined;
    expect(db.createInvoice.calledOnce).to.be.true;
    expect(db.invoices.length).to.equal(1);
    expect(db.invoices[0]).to.deep.equal({
      id: sinon.match.string,
      invoiceNumber: data.invoiceNumber,
      client: data.client,
      items: data.items,
      dueDate: data.dueDate,
      status: data.status,
      createdAt: sinon.match.number,
      updatedAt: sinon.match.number,
    });
  });

  it('should throw an error if input is invalid', async () => {
    const validationError = new Error('Invalid input');
    sinon.stub(validateInput, 'returns').throws(validationError);

    try {
      await createInvoice(data, db);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).to.equal(validationError);
      expect(db.createInvoice.called).to.be.false;
      expect(db.invoices.length).to.equal(0);
    }
  });
});

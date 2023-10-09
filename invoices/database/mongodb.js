'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const database = {
    createInvoice: async (data) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: data,
        };
    
        try {
            await dynamoDb.put(params).promise();
            return params.Item;
        } catch (error) {
            console.error(error);
            throw new Error('Could not create invoice.');
        }
    },

    updateInvoice: async (id, data) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                id: id,
            },
            UpdateExpression: 'set #dueDate = :dueDate, #status = :status, #updatedAt = :updatedAt',
            ExpressionAttributeNames: {
                '#dueDate': 'dueDate',
                '#status': 'status',
                '#updatedAt': 'updatedAt',
            },
            ExpressionAttributeValues: {
                ':dueDate': data.dueDate,
                ':status': data.status,
                ':updatedAt': timestamp,
            },
            ReturnValues: 'ALL_NEW',
        };
    
        try {
            const result = await dynamoDb.update(params).promise();
            return result.Attributes;
        } catch (error) {
            console.error(error);
            throw new Error('Could not update invoice.');
        }
    },

    getInvoiceById: async (id) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                id: id,
            },
        };

        try {
            const result = await dynamoDb.get(params).promise();
            return result.Item;
        } catch (error) {
            console.error(error);
            throw new Error('Could not get invoice.');
        }
    },

    listInvoices: async (email) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            FilterExpression: 'client.email = :email',
            ExpressionAttributeValues: {
                ':email': email,
            },
        };

        try {
            const result = await dynamoDb.scan(params).promise();
            return result.Items;
        } catch (error) {
            console.error(error);
            throw new Error('Could not get invoices.');
        }
    },

    deleteInvoice: async (id) => {
        try {
            await dynamoDb.delete({
                TableName: process.env.DYNAMODB_TABLE,
                Key: {
                    id: id,
                },
            }).promise();
            
            return true;
        } catch (error) {
            console.error(error);
            throw new Error('Could not delete invoice.');
        }
    },
};

module.exports = database;
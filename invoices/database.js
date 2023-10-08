'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createInvoice = async (data) => {
    const timestamp = new Date().getTime();

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            ...data,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return params.Item;
    } catch (error) {
        console.error(error);
        throw new Error('Could not create invoice.');
    }
};

module.exports.editInvoice = async (id, data) => {
    const timestamp = new Date().getTime();

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
};


module.exports.getInvoiceById = async (id) => {
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
};

module.exports.listInvoices = async (userId) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId,
        },
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        return result.Items;
    } catch (error) {
        console.error(error);
        throw new Error('Could not get invoices.');
    }
};
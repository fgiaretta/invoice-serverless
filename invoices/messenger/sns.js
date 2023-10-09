const AWS = require('aws-sdk');
const sns = new AWS.SNS();

publishMessageToSnsTopic = async (topicArn, message) => {
    await sns.publish({
        TopicArn: topicArn,
        Message: message
    }).promise();

    console.log(`Message ${message} sent to the topic ${topicArn}`);
};

module.exports.sendMessage = async (message) => {
    const topicArn = process.env.SNS_TOPIC_ARN_NOTIFY_USERS;

    return await publishMessageToSnsTopic(topicArn, message);
};
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  const { email, code } = JSON.parse(event.body);

  try {
    await cognito.confirmSignUp({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    }).promise();

    console.log(`User ${email} confirmed`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `User ${email} confirmed` }),
    };
  } catch (error) {
    console.error(`Error confirming user ${email}: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error confirming user ${email}` }),
    };
  }
};
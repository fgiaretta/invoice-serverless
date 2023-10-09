const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
    const { email, password } = JSON.parse(event.body);

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    };

    try {
        const { AuthenticationResult } = await cognito.initiateAuth(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Success',
                token: AuthenticationResult.IdToken,
            }),
        };
    } catch (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
    const { email, password } = JSON.parse(event.body);

    const params = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email
            }
        ]
    };

    try {
        const response = await cognito.signUp(params).promise();
        console.log(response);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User signed up successfully' })
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: err.message })
        };
    }
};

const { DynamoDB } = require('aws-sdk');

exports.handler = async function(event) {
    const docClient = new DynamoDB.DocumentClient();
    console.log('-- user read -- ', event);
    try {
        let requestUserId = event.pathParameters.id;
        if (!requestUserId) {
            return {statusCode: 400, body: 'Error Invalid Path parameter'};
        }

        const params = {
            TableName: process.env.USER_TABLENAME,
            Key: {
                'userid': requestUserId
            }
        };
        const result = await docClient.get(params).promise();
        let responseObj = {};
        if (result.Item) {
            responseObj = {
                statusCode: 200,
                body: JSON.stringify(result.Item)
            };
        }
        else {
            responseObj = {statusCode: 404};
        }

        return responseObj;
    } catch (error) {
        console.log('userReadError', error);
        return {
            statusCode: 500,
            body: JSON.stringify({msg:'unable to read user data'})
        };
    }
};
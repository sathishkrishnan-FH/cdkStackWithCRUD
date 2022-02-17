const { DynamoDB } = require('aws-sdk');

exports.handler = async function(event) {
    console.log('-- user update -- ', event);
    const docClient = new DynamoDB.DocumentClient();
    if(!event.body) {
        return { statusCode: 400, body: 'invalid request, missing body parameter' };
    }

    const editUserId = event.pathParameters.id;
    if(!editUserId) {
        return { statusCode: 400, body: 'invalid request, missing User Id' };
    }

    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.USER_TABLENAME,
        Key: {
            'userid': editUserId,
        },
        // Update the "description" column with the one passed in
        UpdateExpression: "SET description = :description",
        ExpressionAttributeValues: {
            ":description": data.description || '',
        },
        ReturnValues: "ALL_NEW",
    };
    try {
        const result = await docClient.update(params).promise();
        console.log('result', result);
        return {
            statusCode: 204,
            body: JSON.stringify({msg: 'user details updated successfully'}),
        };
    } catch (error) {
        console.log('userUpdateError', error);
        return {
            statusCode: 400,
            body:JSON.stringify({msg:'unable to update user data'})
        }
    }
};
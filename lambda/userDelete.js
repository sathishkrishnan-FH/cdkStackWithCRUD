const { DynamoDB } = require('aws-sdk');

exports.handler = async function(event) {
    const docClient = new DynamoDB.DocumentClient();
    console.log('-- user delete -- ', event);
    try {
        const params = {
            TableName: process.env.USER_TABLENAME,
            Key: {
                userid: event.pathParameters.id
            }
        };
    
        const result = await docClient.delete(params).promise();
        console.log('delete result', result);
        return {
            statusCode: 200,
            body: JSON.stringify({status: true})
        };
    } catch (error) {
        console.log('userDeleteError', error);
        return {
            statusCode: 400,
            body:JSON.stringify({msg:'unable to delete user'})
        }
    }
};
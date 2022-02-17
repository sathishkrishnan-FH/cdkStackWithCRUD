const { DynamoDB } = require('aws-sdk');

exports.handler = async function(event) {
    console.log('-- user readAll -- ', event);
    // need to do Some pagination 
    const docClient = new DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.USER_TABLENAME,
    };

    try {
        const result = await docClient.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
    }
    catch (error) {
        console.log('readAll error', error);
        return {
            statusCode: 500,
            body:JSON.stringify({msg:'unable to read users data'})
        }
    }
};
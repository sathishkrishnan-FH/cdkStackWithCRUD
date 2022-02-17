const { DynamoDB } = require('aws-sdk');

exports.handler = async function(event) {
    const docClient = new DynamoDB.DocumentClient();
    console.log('-- user create -- ', event.body);
    let pathParams = JSON.parse(event.body);
    if (!pathParams.userid) {
        return {statusCode: 400, body: 'Error Invalid parameter, UserID empty'};
    }
    const params = {
        TableName: process.env.USER_TABLENAME,
        Item: {
            userid: pathParams.userid,
            name: pathParams.name || '',
            destination: pathParams.destination || '',
            role: pathParams.role || '',
            description: pathParams.description || '',
            createdAt: Date.now(),
        }
    };

    try {
        await docClient.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({msg: 'User Created'})
        };
    }
    catch(error) {
        console.log('userCreateError', error);
        return {
            statusCode: 500,
            body:JSON.stringify({msg:'unable to create user'})
        }
    }
};
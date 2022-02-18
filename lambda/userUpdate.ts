import { DynamoDB } from 'aws-sdk';

export const handler = async (event: any) => {
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
    const userPrimaryKey: string = process.env.USER_PRIMARY_KEY || '';
    let params : any = {
        TableName: process.env.USER_TABLENAME,
        Key: {
            [userPrimaryKey]: parseInt(editUserId),
        },

        UpdateExpression: "SET firstname = :firstname, lastname = :lastname, address = :address",
        ExpressionAttributeValues: {
            ":firstname": data.firstname || '',
            ":lastname": data.lastname || '',
            ":address": data.address || '',
        }
    };
    try {
        await docClient.update(params).promise();
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
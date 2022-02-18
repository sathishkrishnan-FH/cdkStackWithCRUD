import { DynamoDB } from 'aws-sdk';

export const handler = async (event: any) => {
    const docClient = new DynamoDB.DocumentClient();
    console.log('-- user create -- ', event.body);
    let data = JSON.parse(event.body);
    if (!data.userid) {
        return { statusCode: 400, body: 'Error Invalid parameter, UserID empty' };
    }

    const userId = parseInt(data.userid);
    const userPrimaryKey: string = process.env.USER_PRIMARY_KEY || '';
    const params: any = {
        TableName: process.env.USER_TABLENAME,
        Item: {
            [userPrimaryKey]: userId,
            firstname: data.firstname || '',
            lastname: data.lastname || '',
            address: data.address || ''
        }
    };

    try {
        await docClient.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ msg: 'User Created' })
        };
    }
    catch (error) {
        console.log('userCreateError', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: 'unable to create user' })
        };
    }
}
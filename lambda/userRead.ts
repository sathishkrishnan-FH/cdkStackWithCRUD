import { DynamoDB } from 'aws-sdk';

export const handler = async (event: any) => {
    const docClient = new DynamoDB.DocumentClient();
    console.log('-- user read -- ', event);

    let requestUserId = event.pathParameters.id;
    if (!requestUserId) {
        return {statusCode: 400, body: 'Error Invalid Path parameter'};
    }

    const userPrimaryKey: string = process.env.USER_PRIMARY_KEY || '';
    const params: any = {
        TableName: process.env.USER_TABLENAME,
        Key: {
            [userPrimaryKey]: parseInt(requestUserId)
        }
    };
    try {
        const result = await docClient.get(params).promise();
        let responseObj = {};
        if (result.Item) {
            responseObj = {
                statusCode: 200,
                body: JSON.stringify(result.Item)
            };
        }
        else {
            responseObj = {statusCode: 404, body: JSON.stringify({msg: 'user not Found'})};
        }

        return responseObj;
    } catch (error) {
        console.log('userReadError', error);
        return {
            statusCode: 500,
            body: JSON.stringify({msg:'unable to read user data'})
        };
    }
}
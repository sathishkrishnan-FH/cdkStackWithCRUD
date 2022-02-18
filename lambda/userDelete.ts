import { DynamoDB } from 'aws-sdk';

export const handler = async (event: any) => {
    const docClient = new DynamoDB.DocumentClient();
    console.log('-- user delete -- ', event);
    const deleteUserId = event.pathParameters.id;
    if (!deleteUserId) {
        return {statusCode: 400, body: 'Error Invalid Path parameter'};
    }

    const userPrimaryKey: string = process.env.USER_PRIMARY_KEY || '';
    const params: any = {
        TableName: process.env.USER_TABLENAME,
        Key: {
            [userPrimaryKey]: parseInt(deleteUserId)
        }
    };
    try {
        const result = await docClient.delete(params).promise();
        console.log('delete result', result);
        return {
            statusCode: 200,
            body: JSON.stringify({msg: 'user deleted successfully'})
        };
    } catch (error) {
        console.log('userDeleteError', error);
        return {
            statusCode: 500,
            body:JSON.stringify({msg:'unable to delete user'})
        }
    }
}
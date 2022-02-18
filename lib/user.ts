import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

const USER_TABLE_NAME = 'users';
const PRIMARY_KEY = 'userid';

export class User extends Construct {
    public readonly createHandler: lambda.Function;
    public readonly readHandler: lambda.Function;
    public readonly readAllHandler: lambda.Function;
    public readonly updateHandler: lambda.Function;
    public readonly deleteHandler: lambda.Function;

    constructor(scope: Construct, id: string, props?: any) {
        super(scope, id);

        const userTable = new dynamodb.Table(this, USER_TABLE_NAME, {
            partitionKey: {name: PRIMARY_KEY, type: dynamodb.AttributeType.NUMBER}
        });

        this.createHandler = new lambda.Function(this, 'userCreate', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userCreate.handler',
            environment: {
                USER_TABLENAME: userTable.tableName,
                USER_PRIMARY_KEY: PRIMARY_KEY
            }
        });

        this.readHandler = new lambda.Function(this, 'userRead', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userRead.handler',
            environment: {
                USER_TABLENAME: userTable.tableName,
                USER_PRIMARY_KEY: PRIMARY_KEY
            }
        });

        this.readAllHandler = new lambda.Function(this, 'userReadAll', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userReadAll.handler',
            environment: {
                USER_TABLENAME: userTable.tableName,
                USER_PRIMARY_KEY: PRIMARY_KEY
            }
        });

        this.updateHandler = new lambda.Function(this, 'userUpdate', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userUpdate.handler',
            environment: {
                USER_TABLENAME: userTable.tableName,
                USER_PRIMARY_KEY: PRIMARY_KEY
            }
        });

        this.deleteHandler = new lambda.Function(this, 'userDelete', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userDelete.handler',
            environment: {
                USER_TABLENAME: userTable.tableName,
                USER_PRIMARY_KEY: PRIMARY_KEY
            }
        });

        userTable.grantReadWriteData(this.createHandler);
        userTable.grantReadWriteData(this.readHandler);
        userTable.grantReadWriteData(this.readAllHandler);
        userTable.grantReadWriteData(this.updateHandler);
        userTable.grantReadWriteData(this.deleteHandler);
        
    }
}
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

const USER_TABLE_NAME = 'users';

export class User extends Construct {
    public readonly createHandler: lambda.Function;
    public readonly readHandler: lambda.Function;
    public readonly readAllHandler: lambda.Function;
    public readonly updateHandler: lambda.Function;
    public readonly deleteHandler: lambda.Function;

    constructor(scope: Construct, id: string, props?: any) {
        super(scope, id);

        console.log('beforeTableCreate');
        const userTable = new dynamodb.Table(this, USER_TABLE_NAME, {
            partitionKey: {name: 'userid', type: dynamodb.AttributeType.NUMBER}
        });
        console.log('afterTableCreate');
        console.log('beforeCreateLambda');
        this.createHandler = new lambda.Function(this, 'userCreate', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userCreate.handler',
            environment: {
                USER_TABLENAME: userTable.tableName
            }
        });
        console.log('afterCreateLambda');
        this.readHandler = new lambda.Function(this, 'userRead', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userRead.handler',
            environment: {
                USER_TABLENAME: userTable.tableName
            }
        });

        this.readAllHandler = new lambda.Function(this, 'userReadAll', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userReadAll.handler',
            environment: {
                USER_TABLENAME: userTable.tableName
            }
        });

        this.updateHandler = new lambda.Function(this, 'userUpdate', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userUpdate.handler',
            environment: {
                USER_TABLENAME: userTable.tableName
            }
        });

        this.deleteHandler = new lambda.Function(this, 'userDelete', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'userDelete.handler',
            environment: {
                USER_TABLENAME: userTable.tableName
            }
        });

        userTable.grantReadWriteData(this.createHandler);
        userTable.grantReadWriteData(this.readHandler);
        userTable.grantReadWriteData(this.readAllHandler);
        userTable.grantReadWriteData(this.updateHandler);
        userTable.grantReadWriteData(this.deleteHandler);
        
    }
}
/*import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class SathishkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'SathishkWorkshopQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'SathishkWorkshopTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));
  }
}*/


import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { HitCounter } from './hitcounter';
import { User } from './user';
import { TableViewer } from 'cdk-dynamo-table-viewer';

export class SathishkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // this.sampleHitCounterAndHello();
    this.userCRUD();
    // create lambda for create delete put getAll getList
    // create dynamoDb 
    // create API gateway REST API 
   }

   userCRUD() {
     const user = new User(this, 'sathishkUserCRUD');
     const userApi = new apigw.LambdaRestApi(this, 'sathishkUser', {
       handler: user.readAllHandler,
       proxy: false
     });

     const createIntegration = new apigw.LambdaIntegration(user.createHandler);
     const readIntegration = new apigw.LambdaIntegration(user.readHandler);
     const readAllIntegration = new apigw.LambdaIntegration(user.readAllHandler);
     const updateIntegration = new apigw.LambdaIntegration(user.updateHandler);
     const deleteIntegration = new apigw.LambdaIntegration(user.deleteHandler);

     const userResource = userApi.root.addResource('users');
     userResource.addMethod('GET', readAllIntegration);
     userResource.addMethod('POST', createIntegration);
   
    const particularResourse = userResource.addResource('{id}');
    particularResourse.addMethod('GET', readIntegration);
    particularResourse.addMethod('PATCH', updateIntegration);
    particularResourse.addMethod('DELETE', deleteIntegration);

    }
  
   sampleHitCounterAndHello() {
    const welcome = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: welcome
    });

    // api gateWay
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });

    new TableViewer(this, 'ViewHitCounter', {
      title: 'Hello Hits',
      table: helloWithCounter.table
    });
  }


}

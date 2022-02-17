# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`SathishkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

Step 1: 
    this is to create a stack  
        it contain SQS SNS we can remove it .. if no need 

    cdk init sample-app --language typescript 
    npm run watch 
    cdk synth  --- template for the cloud Stack
    cdk bootstrap
    cdk deploy
    cdk deploy --hotswap # cdk watch # or this will upload the chages alone 
    --do change in environment ( stack )
    cdk diff

Step 2 : create any service as required like lambda, SQS, SNS ...
    i am trying lambda
        create lambda folder and create files ( handler.is your starting point )
        trigger the lambda from -stack.ts constructor 
            runtime, code (path of lambda folder), handler: 'filename.handler'

        cdk diff

        cdk deploy

        view your lambda function in console.aws
        eventTemplate as AWS.API.Gateway...

Step 3:          

ssm 
sns
s3
dynamo Db
api gateway 
lambda



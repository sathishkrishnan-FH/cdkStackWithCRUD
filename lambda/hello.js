exports.handler = async function(event) {
    console.log('request', JSON.stringify(event, undefined, null));
    return {
        statusCode: 200,
        headers: {'Content-type': 'text/plain'},
        body: `Hello this is test script ............ via CDK ${event.path}\n ${Date()}`
    };
};
const AWS = require('aws-sdk');
AWS.config.apiVersion = {sqs: '2012-11-05'};
AWS.config.update({
    region: "us-east-2",
    accessKeyId : "AKIAJUL3RXRJFAGMWLRA",
    secretAccessKey : "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"
  });
 

const sqs = new AWS.SQS();

const accountId = '202263347443';
const queueName = 'myQueue';
const queueUrl = `https://sqs.us-east-2.amazonaws.com/202263347443/myQueue`;


const params = {
  QueueUrl: queueUrl,
  MaxNumberOfMessages: 1,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0
};
sqs.receiveMessage(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     {
        console.log(data);       
    
    //var orderData = data.Messages[0].Body;
    //console.log('Order received', orderData);
    

    const deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: data.Messages[0].ReceiptHandle
    };

    sqs.deleteMessage(deleteParams, function(err, data) {
        if (err) console.log(err,err.stack);
        else console.log("Hello");
    })();

}
  });
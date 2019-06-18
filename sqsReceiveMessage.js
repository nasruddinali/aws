var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});


var sqs = new AWS.SQS({apiVersion: '2012-11-05'})

var params = {
    DelaySeconds: 10,
    MessageAttributes: {
      "Title": {
        DataType: "String",
        StringValue: "The Whistler"
      },
      "Author": {
        DataType: "String",
        StringValue: "John Grisham"
      },
      "WeeksOn": {
        DataType: "Number",
        StringValue: "6"
      }
    },
    MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    QueueUrl: "	https://sqs.us-east-2.amazonaws.com/202263347443/myQueue"
  };
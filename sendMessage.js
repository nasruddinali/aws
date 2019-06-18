const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-2",
  accessKeyId : "AKIAJUL3RXRJFAGMWLRA",
  secretAccessKey : "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"
});

var params = { 
  Message: 'MESSAGE_TEXT_by_Nasruddin_Ali634y23942', /* required */
  TopicArn: 'arn:aws:sns:us-east-2:202263347443:myTopic'
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    console.log("Message ${params.Message} send sent to the topic ${params.TopicArn}");
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });

// Make sure this is initialized *after* AWS SDK is configured
const sns = new AWS.SNS();
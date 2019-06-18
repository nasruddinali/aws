var AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'});

var createTopicPromise = new AWS.SNS({apiVersion: '2010-03-31'}).createTopic({Name: "JustATopic"}).promise();

createTopicPromise.then(
    function(data) {
      console.log("Topic ARN is " + data.TopicArn);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
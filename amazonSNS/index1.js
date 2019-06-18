var AWS = require('aws-sdk')
AWS.config.loadFromPath('config.json');
var sns = new AWS.SNS();
var params = {
    TargetArn: "arn:aws:sns:us-east-2:202263347443:myTopic:9bffe109-e2af-446b-96ba-f33141191e69",
    Message: 'Success!!! ',
    Subject: 'TestSNS'
};

sns.publish(params, function(err,data){
        if (err) {
            console.log('Error sending a message', err);
        } else {
            console.log('Sent message:', data.MessageId);
        }
    });
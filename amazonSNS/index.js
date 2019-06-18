const express = require( 'express' );
const app = express();
app.get('/', (req, res) => {
    
    //load aws-sdk module
    var AWS = require('aws-sdk');
    //loads config.json which we created earlier which contains aws security credentials.
    AWS.config.loadFromPath('config.json');
  
    var sns = new AWS.SNS();
    var SNS_TOPIC_ARN = "myTopic";
    
   
    //subscribing a mobile number to a topic
    sns.subscribe({
        Protocol: 'Email',
        TopicArn: SNS_TOPIC_ARN,
        Endpoint: 'nasruddin.ali@mfine.co'  // type mobile number to whom you want to send a message.
    }, function(error, data) {
        if (error) {
            console.log("error when subscribe", error);
        }
        console.log("subscribe data", data);
        var SubscriptionArn = data.SubscriptionArn;
        var params = {
            TargetArn: SNS_TOPIC_ARN,
            Message: "message",//type your message
            Subject: 'type_your_subject' //type your subject
        };
        
        //publish a message.
        sns.publish(params, function(err_publish, data) {
            if (err_publish) {
                console.log('Error sending a message', err_publish);
            } else {
                console.log('Sent message:', data.MessageId);
            }
            var params = {
                SubscriptionArn: 'arn:aws:sns:us-east-2:202263347443:myTopic:9bffe109-e2af-446b-96ba-f33141191e69'
            };
            
            //unsubscribing the topic
            sns.unsubscribe(params, function(err, data) {
                if (err) {
                    console.log("err when unsubscribe", err);
                }
            });
        });
   });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))
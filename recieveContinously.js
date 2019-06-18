const AWS = require('aws-sdk');

var Promise = require('es6-promise')
const chalk = require('chalk')

var Q = require('q');
AWS.config.apiVersion = {sqs: '2012-11-05'};

 
  const accountId = '202263347443';
  const queueName = 'myQueue';
  const queueUrl = `https://sqs.us-east-2.amazonaws.com/202263347443/myQueue`;

const sqs = new AWS.SQS( {
    region: "us-east-2",
    accessKeyId : "AKIAJUL3RXRJFAGMWLRA",
    secretAccessKey : "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",

    params: {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        VisibilityTimeout: 0,
        WaitTimeSeconds: 0
      }

});


var receiveMessage = Q.nbind(sqs.receiveMessage, sqs);
var deleteMessage = Q.nbind(sqs.deleteMessage, sqs);

(function pollQueueForMessages() {

    console.log( chalk.yellow( "Starting long-poll operation." ) );

    receiveMessage({
        WaitTimeSeconds: 3, 
        VisibilityTimeout: 10
    })
    .then(
        function handleMessageResolve( data ) {

           
            if ( ! data.Messages ) {

                throw(
                    workflowError(
                        "EmptyQueue",
                        new Error( "There are no messages to process." )
                    )
                );

            }
            
            console.log( chalk.green( "Deleting:", data.Messages ) );
            return(
                deleteMessage({
                    ReceiptHandle: data.Messages[ 0 ].ReceiptHandle
                })
            );

        }
    )
    .then(
        function handleDeleteResolve( data ) {

            console.log( chalk.green( "Message Deleted!" ) );

        }
    )

    
    .catch(
         function handleError( error ) {

            switch ( error.type ) {
                case "EmptyQueue":
                    console.log( chalk.cyan( "Expected Error:", error.message ) );
                break;
                default:
                    console.log( chalk.red( "Unexpected Error:", error.message ) );
                break;
            }

       }
    )

    .finally( pollQueueForMessages );

})();

function workflowError( type, error ) {

    error.type = type;

    return( error );

} 
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'REGION'});

// Create SMS Attribute parameter you want to get
var params = {
  attributes: [
    'DefaultSMSType',
    'ATTRIBUTE_NAME'
    /* more items */
  ]
};

// Create promise and SNS service object
var getSMSTypePromise = new AWS.SNS({apiVersion: '2010-03-31'}).getSMSAttributes(params).promise();

// Handle promise's fulfilled/rejected states
getSMSTypePromise.then(
  function(data) {
    console.log(data);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });

var AWS = require('aws-sdk');


AWS.config.update({region: 'us-east-2'});

var listTopicsPromise = new AWS.SNS({apiVersion: '2010-03-31'}).listTopics({}).promise();

listTopicsPromise.then(
    function(data) {
      console.log(data.Topics);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
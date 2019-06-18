const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/node-demo';
MongoClient.connect(url, function(err, db) {
    const cursor = db.collection('users').find();
    cursor.each(function(err, doc) {
        console.log(doc);
    });
    db.close();
});
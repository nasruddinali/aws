var mongoClient = require("mongodb").MongoClient;

    var server = "mongodb://localhost:27017/node-demo";

    mongoClient.connect(server, function(error, db) {
    if(error)
    console.log("Error while connecting to database: ", error);
    else
    console.log("Connection established successfully");

    //perform operations here

    const data = db.collection("Nasruddin")

    db.close();
 });

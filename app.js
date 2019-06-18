var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
const MobileSpecification = new mongoose.Schema({
    OS: String,
    Brand: String,
    ModelName: String,
    Weight: String,
    Battery_Capacity: String,
    Screen_Size: String,
    RAM: String,
    Storage: String
});
var User = mongoose.model("User", MobileSpecification);




app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addmobile", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Model saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.get('/recover', (req, res) => {
    res.sendFile(__dirname + '/search_model.html');
});

app.post('/recover', (req,res) => {
    console.log(req.body);
    User.find({Brand: req.body.Brand}, function(err, response) {
        res.json(response);
    });
});
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
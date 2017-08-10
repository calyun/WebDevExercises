var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

// tells express to use "public" folder
app.use(express.static("public"));
// tells server that "number","posts" indicates "number.ejs","posts.ejs"
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("HOME PAGE CONTENT");
});

var friends = ["Friend1", "Friend2", "Bob"];

// Wildcard for route
app.get("/user/:username", function(req, res){
    var messages = {
        haoyu: "WELCOME ADMIN!",
    };
    var username = req.params.username;
    var result = "user profile of " + username;
    var message = messages[username];
    result += message;
    res.send(result);
});

// app.post triggers only by post request
app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.get("*", function(req, res){
    res.send("ERROR 404");
});

// process.env.PORT listen for Cloud9 port+IP
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server initialized.");
})
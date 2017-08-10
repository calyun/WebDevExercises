var express = require("express");
var app = express();

// tells express to use "public" folder
app.use(express.static("public"));
// tells server that "number","posts" indicates "number.ejs","posts.ejs"
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("HOME PAGE CONTENT");
})

// Wildcard for route
app.get("/user/:username", function(req, res){
    var messages = {
        haoyu: "WELCOME ADMIN!",
    }
    var username = req.params.username;
    var result = "user profile of " + username;
    var message = messages[username];
    result += message;
    res.send(result);
})


app.get("*", function(req, res){
    res.render("404 ERROR");
})

// process.env.PORT listen for Cloud9 port+IP
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server initialized.");
})
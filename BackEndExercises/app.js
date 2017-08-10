var express = require("express");

var app = express();

// tells express to use "public" folder
app.use(express.static("public"));
// tells server that "number","posts" indicates "number.ejs","posts.ejs"
app.set("view engine", "ejs");

// request and response
app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/next", function(req, res) {
    console.log("Request made to /next!")
    res.send("This is the next page.");
})

// Wildcard for the route!
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

app.get("/number/:num", function(req, res){
    var num = req.params.num;
    res.render("number", {placeHolder : num});
});

app.get("/repeat/:message/:it", function(req, res){
    // how to get the given link!
    var message = req.params.message;
    var it = Number(req.params.it);
    var result = "";
    while (it--)
    {
        result += message + " ";
    }
    res.send(result);
})

app.get("/posts", function(req, res) {
    var posts = [
            {title: "Deep Learning", author: "Yair"},
            {title: "Web Development", author: "Tim"},
            {title: "Chess Games", author: "Luke"}
        ];
        
    res.render("posts", {posts: posts})
})

// Catch all
app.get("*", function(req, res) {
    res.send("Error! Page not found!");
})

// process.env.PORT listen for Cloud9 port+IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server initialized.");
});
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

// reads long url version
app.use(bodyParser.urlencoded({extended: true}));

// tells express to use "public" folder
app.use(express.static("public"));
// tells server that "number","posts" indicates "number.ejs","posts.ejs"
app.set("view engine", "ejs");

app.get("/search", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res){
    
    var search_term = req.query.search_term;
    var url = "http://omdbapi.com/?s=" + search_term + "&apikey=thewdb";
    
    request(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            //console.log(data["Search"][0]["Title"]);
            res.render("results", {data: data});
        }
    });
    
});

var favorites = [];

// app.post triggers only by post request
app.post("/addfavorite", function(req, res){
    var newfavorite = req.body.newfavorite;
    favorites.push(newfavorite);
    res.redirect("/favorites");
});

app.get("/favorites", function(req, res){
    res.render("favorites", {favorites: favorites});
});

app.get("*", function(req, res){
    res.render("404 ERROR");
});

// process.env.PORT listen for Cloud9 port+IP
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server initialized.");
})
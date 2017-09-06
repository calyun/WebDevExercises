var bodyParser  = require("body-parser"),
expressSanitizer    = require("express-sanitizer"),
methodOverride  = require("method-override"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();

mongoose.connect("mongodb://localhost/blog_app");

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());    // sanitize input from <script> tags
app.use(methodOverride("_method"));

// MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default:"banana.png"},
    body: String,
    //defaults as current date
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// var userSchema = new mongoose.Schema({
//     name: String,
//     blogs: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Blog"
//     }]
// });
// var User = mongoose.model("User", userSchema);

// User.create({
//     name: "admin",
//     blogs: []
// });

// // // link blog with user
// // Blog.create({
// //     title: "Title",
// //     image: "",
// //     body: "Body of Blog",
// // }, function(err, blog){
// //     User.findOne({name: "admin"}, function(err, foundUser){
// //         if(err){
// //             console.log(err);
// //         } else {
// //             foundUser.blogs.push(blog);
// //             foundUser.save(function(err, data){
// //                 if(err){
// //                     console.log(err);
// //                 } else {
// //                     console.log(data);
// //                 }
// //             });
// //         }
// //     });
// // });


// // display blog
// User.findOne({name: "admin"}).populate("blogs").exec(function(err, user) {
//     if (err) {} else {
//     console.log(user);
//     }
// });


// ROUTES config

app.get("/", function(req, res){
    res.redirect("/blogs");    
});

// GET
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// CREATE
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    // passes data in to be created
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });  
});

// NEW
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// SHOW
app.get("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           console.log("this id does not exist, dear friend");
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   });
});

// EDIT
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log("Error with EDIT route");
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("Error with DELETE route");
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER UP!");
});
# Javascript 

* npm - package manager
* node.js - framework


# Frameworks

* Inversion of control - the framework calls you!
* Quick way to start


# Express

* Lightweight framework - lot of flexibility of adding things


# Package.json

* JavaScript Object Notation - metadata
* Also contains all packages/dependencies needed + version numbers

# .ejs

* .ejs - embedded JavaScript (dynamic pages)

# .ejs control flow

* <%= %> renders to HTML
* <% %> evaluates code w/o adding to HTML
* 
// tells express to use "public" folder
app.use(express.static("public"));
// tells server that "number","posts" indicates "number.ejs","posts.ejs"
app.set("view engine", "ejs");

* Include Partials!! (e.g. Header, NavBar, Footer, ...)

# APIs
* Application Programming Interface

* response.statusCode == 200 --> standard response
* // turns into JSON object
*  var parsedData = JSON.parse(body);
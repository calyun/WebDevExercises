// https://speakerdeck.com/rdegges/everything-you-ever-wanted-to-know-about-authentication-in-node-dot-js



var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    bcrypt      = require('bcryptjs'),
    //csrf       = require('csurf'),
    session     = require('client-sessions');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
//app.use(csrf());    // todo: implement CSRF protection, linking of sensitive pages from external sites
app.set('view engine', 'pug');

mongoose.connect("mongodb://localhost/auth_scratch");
var Schema      = mongoose.Schema;
var ObjectId    = Schema.ObjectId;

var User = mongoose.model('User', new Schema({
    id: ObjectId,
    firstName:  String,
    lastName: String,
    email: {type: String, unique: true},
    password: String,
}));

app.use(session({
    cookieName: 'session',
    secret: 'ASDFGHJKL',
    duration: 60*60*1000,  // ends after 60 min inactivity
    activeDuration: 5*60*1000,  // extends by 5 min per activity
    httpOnly: true,     // only allow http access, don't let js code access
    secure: true,       // https required
    ephemeral: true,    // destroy cookies at browser close
}));

app.use(function(req, res, next) {
    if (req.session && req.session.user) {
        User.findOne({ email: req.session.user }, function(err, user) {
            // user found --> make user data available for the session
            if (user) {
                req.user = user;
                req.session.user = user.email;  // session info
                req.locals.user = user;     // for template access
            }
            next(); // continue
        });
    } else {
        next();
    }
});

app.get('/', function(req, res) {
    res.render('index.pug');
});

app.get('/register', function (req, res){
    res.render('register.pug');
});

app.post('/register', function(req, res){
    var salt = bcrypt.genSaltSync(10);      // 10 iterations with salt-gen
    var hash = bcrypt.hashSync(req.body.password, salt);
    
    var user = new User({
        firstName:  req.body.firstName,
        lastName:   req.body.lastName,
        email:      req.body.email,
        password:   hash,           // save hashed in mongodb
    });
    user.save(function(err) {
        if (err) {
            var error = 'Some error';
            
            if (err.code === 11000) //email taken
            {
                error = 'Email unavailable';
            }
            
            res.render('register.jade', {error: error});
        } else {
            req.session.user = user.email;      // id the current session with user email
            res.redirect('/dashboard');
        }
    });
});

app.get('/login', function (req, res){
    res.render('login.pug');
});

app.post('/login', function(req, res){
    User.findOne({ email: req.body.email }, function(err, user){
        if (err) {
            console.log(err); 
        } else {
            if (!user) {
                res.render('login.pug', {error: "Incorrect email or password," });
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.user = user.email;
                    res.redirect('/dashboard');
                } else {
                    res.render('login.pug', {error: "Incorrect email or password." });
                }
            }
        }
    });
});


function requireLogin(req, res, next) {
    // redirect if not logged in
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

app.get('/dashboard', requireLogin, function (req, res){
    if (req.user && req.session.user) {
        User.findOne({email: req.session.user}, function(err, user) {
            if (err) {
                console.log(err); 
            } else {
                if (!user) {
                    req.session.reset();
                    res.redirect('/login');
                } else {
                    res.locals.user = user;
                    res.render('dashboard.pug');
                }
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});
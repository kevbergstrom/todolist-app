const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    bodyParser = require("body-parser"),
	User = require("./models/user")

const app = express()

const DATABASEURL = process.env.DATABASEURL || "mongodb://localhost:27017/todo_list_app"
const PORT = process.env.PORT || 3000
const SECRET = process.env.SECRET

//PASSPORT CONFIG
app.use(require("express-session")({
	secret: SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
mongoose.set('useUnifiedTopology', true);
mongoose.connect(DATABASEURL, {useNewUrlParser: true});

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/signup", function(req,res){
    res.render("signup")
})

app.post("/signup", function(req,res){
    const newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
            console.log(err)
            return res.render("signup")
		}
		passport.authenticate("local")(req, res, function(){
            console.log("authneticated")
			res.redirect("/")
		})
	})
})

app.listen(PORT, function(){
    console.log("Server started at http://localhost:" + PORT)
})
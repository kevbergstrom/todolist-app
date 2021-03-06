const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
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
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(DATABASEURL, {useNewUrlParser: true});
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next()
})

//routes
const indexRoutes = require("./routes/index"),
    listRoutes = require("./routes/lists"),
    userRoutes = require("./routes/users")

app.use(indexRoutes)
app.use("/list", listRoutes)
app.use("/user", userRoutes)

//server
app.listen(PORT, function(){
    console.log("Server started at http://localhost:" + PORT)
})
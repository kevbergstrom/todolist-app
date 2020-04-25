var express = require("express")
var router = express.Router()
var passport = require("passport")
var List = require("../models/list")
var User = require("../models/user")

//INDEX
router.get("/", function(req,res){
    User.findById(req.user._id).populate("todos").exec(function(err, foundUser){
		if(err || !foundUser){
            console.log(err)
			res.redirect("/")
		} else {
			//render show template with that campground
			res.render("dashboard", {todos: foundUser.todos.reverse()});
		}
	});
})

//NEW
router.get("/new", function(req,res){
    res.render("lists/new")
})

//CREATE
router.post("/", function(req,res){
	//create list object
    const newList = {   
        completed: false,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    };
    //TODO security check
    //create a new list
    User.findById(req.user._id, function(err,foundUser){
        if(err){
            console.log(err)
            res.redirect("/list");
        } else {
            List.create(newList, function(err,newTodo){
                if(err){
                    console.log(err)
                    res.redirect("/list");
                } else {
                    //add comment ref to user
                    foundUser.todos.push(newTodo)
                    foundUser.save()
                    res.redirect("/list");
                }
            })
        }
    })
})

module.exports = router
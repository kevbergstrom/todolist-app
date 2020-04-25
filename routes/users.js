var express = require("express")
var router = express.Router()
var passport = require("passport")
var List = require("../models/list")
var User = require("../models/user")

//SHOW
router.get("/:id", function(req,res){
    res.render("users/show")
})

module.exports = router
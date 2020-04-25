const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("landing")
})

app.listen(PORT, function(){
    console.log("Server started at http://localhost:" + PORT)
})
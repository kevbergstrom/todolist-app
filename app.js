const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.get("/", function(req, res){
    res.send("Landing Page")
})

app.listen(PORT, function(){
    console.log("Server started at http://localhost:" + PORT)
})
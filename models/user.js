const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	todoCount: {type: Number, default: 0},
	created: {type: Date, default: Date.now},
	todos: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "List"
	}]
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)
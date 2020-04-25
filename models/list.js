const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema({
    completed: Boolean,
    description: String,
    created: {type: Date, default: Date.now},
    author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
})

module.exports = mongoose.model("List", ListSchema)
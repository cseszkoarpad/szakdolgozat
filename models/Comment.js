const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = Schema({
	name: String,
	text: String,
	feltoltve: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Comment', commentSchema)
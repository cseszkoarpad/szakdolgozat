const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = Schema({
	text: String,
	feltoltve: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Comment', commentSchema)
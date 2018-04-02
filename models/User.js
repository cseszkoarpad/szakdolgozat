const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
	googleId: String,
	name: String,
	credits: { type: Number, default: 0 },
	_autos: [{ type: Schema.Types.ObjectId, ref: 'Auto' }],
	_comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	registered: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
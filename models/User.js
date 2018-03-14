const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const Schema = mongoose.Schema

const userSchema = Schema({
	googleId: String,
	credits: { type: Number, default: 0 },
	_autos: [{ type: Schema.Types.ObjectId, ref: 'Auto' }],
	_comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	registered: { type: Date, default: Date.now }
})

userSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', userSchema)
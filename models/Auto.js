const mongoose = require('mongoose')
const Schema = mongoose.Schema

const autoSchema = Schema({
	marka: { type: String, required: true },
	modell: { type: String, required: true },
	kep: String,
	ar: Number,
	ev: Number,
	allapot: String,
	kivitel: String,
	km: Number,
	szin: String,
	tomeg: Number,
	uzemanyag: String,
	hengerUrtartalom: Number,
	teljesitmeny: Number,
	hajtas: String,
	valto: String,
	leiras: String,
	feltoltve: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 },
	_comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

module.exports = mongoose.model('Auto', autoSchema)
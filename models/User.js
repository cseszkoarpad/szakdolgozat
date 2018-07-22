const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  googleId: String,
  name: String,
  profilePic: String,
  credits: {type: Number, default: 0},
  _cars: [{type: Schema.Types.ObjectId, ref: 'Car'}],
  _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  registered: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
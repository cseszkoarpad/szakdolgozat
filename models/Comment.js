const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
  feltoltve: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);
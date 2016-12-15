var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: String,
    complete: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);

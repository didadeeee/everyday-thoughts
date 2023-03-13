const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const Thought = require("../models/thought");

const bookSchema = new Schema({
  bookTitle: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  thought: { type: Schema.Types.ObjectId, ref: Thought }
});


module.exports = mongoose.model('Book', bookSchema);
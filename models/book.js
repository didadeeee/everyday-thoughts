const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
    thought: String
  } , {
      timestamps: true
  });


const bookSchema = new Schema({
  bookTitle: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  thought: [thoughtSchema]
});

module.exports = mongoose.model('Book', bookSchema);
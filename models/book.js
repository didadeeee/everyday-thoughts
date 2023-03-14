const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      required: true,
    },
},
  {
    timestamps: true,
  }
);

const bookSchema = new Schema({
  bookTitle: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  thoughts: [thoughtSchema]
});


module.exports = mongoose.model('Book', bookSchema);

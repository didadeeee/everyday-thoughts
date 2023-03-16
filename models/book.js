const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      trim: true,
      required: true
    },
},
  {
    timestamps: true,
  }
);

const bookSchema = new Schema({
  bookTitle: {
    type: String,
    trim: true,
    required: true
  },
  quote: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  genre: {
    type: String,
    enum: ['Action & Adventure', 'Detective & Mystery', 'Sci-Fi', 'Romance', 'Biographies', 'Self-Help']
  },
  thoughts: [thoughtSchema]
});


module.exports = mongoose.model('Book', bookSchema);

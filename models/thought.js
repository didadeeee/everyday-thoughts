const mongoose = require("mongoose");
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

module.exports = mongoose.model("Thought", thoughtSchema);

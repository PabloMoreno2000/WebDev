const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  desct: {
    type: String,
    required: true,
  },
});

module.exports = Card = mongoose.model("card", CardSchema);

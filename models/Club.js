const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ClubSchema = new Schema({
  sports: {
    type: String,
    required: true,
  },
  player: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("club", ClubSchema);

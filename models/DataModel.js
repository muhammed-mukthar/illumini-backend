const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
  view: {
    type:String
  }
});

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;
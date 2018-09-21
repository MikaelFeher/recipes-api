const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  numberOfPeople: Number,
  ingredients: [{
    _id: false,
    name: String,
    units: Number,
    measuringUnit : String,
    unitEquivalentInGrams: Number
  }],
  instructions: [String],
  img: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  description: String,
  category: String
})

module.exports = mongoose.model('Recipe', schema);
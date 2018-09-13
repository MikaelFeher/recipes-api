const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  numberOfPeople: Number,
  ingredients: [{
    name: String,
    units: Number,
    measuringUnit : String,
    unitEquivalentInGrams: Number
  }],
  instructions: [String],
  img: String
})

module.exports = mongoose.model('Recipe', schema);
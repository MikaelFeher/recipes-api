const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  numberOfPeople: Number,
  ingredients: [{
    _id: false,
    name: String,
    units: Number,
    measuringUnit : String,
    unitEquivalentInGrams: Number,
    nutritionalValues: [{
      _id: false,
      name: String,
      abbreviation: String,
      value: Number,
      unit: String
    }]
  }],
  instructions: [String],
  img: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  description: String,
  categories: [String],
  cookingTime: String,
  difficultyLevel: String
})

module.exports = mongoose.model('Recipe', schema);
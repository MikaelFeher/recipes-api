const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  category: String,
  WeightGram: String,
  nutritionalValues: [{
    _id: false,
    name: String,
    abbreviation: String,
    value: Number,
    unit: String
  }]
})

module.exports = mongoose.model('Ingredient', schema);
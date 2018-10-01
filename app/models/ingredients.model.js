//TODO: Implement an ingredient model and read in the ./json/livsmedelsdata.json to mongo.
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
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

schema.pre('save', async function() {
  this.nutritionalValues.reduce((acc, nutrition) => acc.concat(
    Object.assign({}, nutrition, { [nutrition.value] : +[nutrition.value].replace(',', '.') })), [])
    .filter(item => item.name === 'Energi (kcal)'                   || 
                    item.name === 'Protein'                         || 
                    item.name === 'Kolhydrater'                     ||
                    item.name === 'Socker totalt'                   ||
                    item.name === 'Salt'                            ||
                    item.name === 'Summa mättade fettsyror'         ||
                    item.name === 'Summa enkelomättade fettsyror'   ||
                    item.name === 'Summa fleromättade fettsyror'
                  )
})
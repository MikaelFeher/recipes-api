const ingredientsJSON = require('../json/livsmedelsdata.json');
const Ingredient = require('../models/ingredients.model');

async function migration() {
  const newIngredients = await ingredientsJSON.reduce((acc, item) => acc.concat(Object.assign({}, {
    name: item.Namn,
    category: item.Huvudgrupp,
    WeightGram: item.ViktGram,
    nutritionalValues: item.Naringsvarden.Naringsvarde.reduce((acc, nv) => acc.concat(Object.assign({}, {
      name: nv.Namn,
      abbreviation: nv.Forkortning,
      value: parseFloat(nv.Varde.replace(',', '.')),
      unit: nv.Enhet
    })), [])
      .filter(item => filterNutrients(item.name))
  })), [])

  return await newIngredients.map(newIngredient => new Ingredient(newIngredient).save())
    .then(result => console.log(result))
    .catch(err => console.log(err))
}

function filterNutrients(name) {
  const itemsToFind = [
    'Energi (kcal)',
    'Protein', 
    'Kolhydrater', 
    'Socker totalt', 
    'Salt', 
    'Summa mättade fettsyror',
    'Summa enkelomättade fettsyror',
    'Summa fleromättade fettsyror'
  ]

  return itemsToFind.indexOf(name) >= 0
}

module.exports = {
  migration
}
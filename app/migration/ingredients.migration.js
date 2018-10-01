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
      .filter(item => item.name === 'Energi (kcal)'                   || 
                      item.name === 'Protein'                         ||
                      item.name === 'Kolhydrater'                     ||
                      item.name === 'Socker totalt'                   ||
                      item.name === 'Salt'                            ||
                      item.name === 'Summa mättade fettsyror'         ||
                      item.name === 'Summa enkelomättade fettsyror'   ||
                      item.name === 'Summa fleromättade fettsyror'
      )
  })), [])

  return await newIngredients.map(newIngredient => new Ingredient(newIngredient).save())
    .catch(err => console.log(err))
}

module.exports = {
  migration
}
/* ONLY NECESSARY FOR MIGRATING INGREDIENTS FROM JSON-FILE TO DATABASE */
// const ingredientsMigration = require('../migration/ingredients.migration');

const Ingredient = require('../models/ingredients.model');

module.exports = routes => {
  
  // Get the first 5 ingredients...
  routes.get('/five', (req, res) => {
    res.json(ingredients.slice(0, 5));
  });

  // Get all ingredients
  routes.get('/', (req, res) => {
    const ingredients = ''
    res.json(ingredients);
  });
  
  // TODO: After the ingredients model is implemented this needs to be changed to take :id instead of :name...
  // Find ingredients by name...
  routes.get('/find-by-name/:name', (req, res) => {
    let name = req.params.name.toLowerCase();
    if(name.length < 2) return res.json({ error: 'Name must contain atleast 2 characters.' });
    
    let result = ingredients.filter(ingredient => ingredient.Namn.toLowerCase().indexOf(name) == 0)
      .map(ingredient => ingredient.Namn)
    
    return res.json(result);
  });
  /***** ONLY USE ONCE TO MIGRATE INGREDIENTS FROM JSON-FILE TO DATABASE *****/
  // routes.get('/ingredients/migrate', (req, res) => {
  //   ingredientsMigration.migration()
  //     .catch(err => res.json(err))
  // })
  
  return routes
}
/* ONLY NECESSARY FOR MIGRATING INGREDIENTS FROM JSON-FILE TO DATABASE */
// const ingredientsMigration = require('../migration/ingredients.migration');

const Ingredient = require('../models/ingredients.model');

module.exports = routes => {
  
  // Get all ingredients
  routes.get('/', async (req, res) => {
    const ingredients = await Ingredient.find().lean().exec();
    if(!ingredients.length) return res.json({ error: 'There are no ingredients...' })

    res.json(ingredients);
  });

  // Get the first 5 ingredients...
  routes.get('/five', async (req, res) => {
    const ingredients = await Ingredient.find().lean().exec();
    if(!ingredients.length) return res.json({ error: 'There are no ingredients...' })

    res.json(ingredients.slice(0, 5));
  });
  
  /***************************** FOR API TESTING *****************************/
  // Find ingredients by name...
  routes.get('/find-by-name/:name', async (req, res) => {
    const ingredients = await Ingredient.find().lean().exec();
    let name = req.params.name.toLowerCase();
    
    if(!ingredients.length) return res.json({ error: 'There are no ingredients...' })
    if(name.length < 2) return res.json({ error: 'Name must contain atleast 2 characters.' });
    
    let result = ingredients.filter(ingredient => ingredient.name.toLowerCase().indexOf(name) == 0)
    .reduce((acc, ingredient) => acc.concat(Object.assign({}, { name: ingredient.name, url: `http://localhost:3003/ingredients/find-by-id/${ingredient._id}` })), [])
    
    return res.json(result);
  });
  
  // Find ingredients by id...
  routes.get('/find-by-id/:id', async (req, res) => {
    const { id } = req.params
    const ingredient = await Ingredient.findById(id).lean().exec()
    if(!ingredient) return res.json({ error: 'Hm, seems like that ingredient joined the witness protection program...' })
    
    res.json(ingredient)
  })
  /***************************************************************************/
  
  /***** ONLY USE ONCE TO MIGRATE INGREDIENTS FROM JSON-FILE TO DATABASE *****/
  // routes.get('/ingredients/migrate', (req, res) => {
  //   ingredientsMigration.migration()
  //     .catch(err => res.json(err))
  // })
  
  return routes
}
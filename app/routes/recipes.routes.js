//TODO: Change the routes to take :id instead of :name...

const Recipe = require('../models/recipe.model');

module.exports = routes => {
  
  // Get all recipes
  routes.get('/', async (req, res) => {
    let recipes = await Recipe.find().lean().exec();
    if(!recipes) return res.json({ error: 'No recipes added yet...' });
    
    return res.json(recipes);
  });

  // Get latest recipes
  routes.get('/latest-recipes', async (req, res) => {
    const latestRecipes = await Recipe.find().sort({ createdAt: -1 }).limit(5).lean().exec();
    res.json(latestRecipes);
  })
  
  // Find a recipe by name, makes partial matches...
  /* TODO: Maybe change this to be :id instead and put the dynamic search
  functionality on the frontend? */
  routes.get('/find-by-name/:name', async (req, res) => {
    const recipe = await Recipe.find({ name: { "$regex": req.params.name, "$options": "i"} }).lean().exec();
    if (!recipe.length) return res.json({ error: 'No recipe with that name exists!' });
    
    return res.json(recipe);
  });
  
  return routes
}
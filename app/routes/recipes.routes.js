const Recipe = require('../models/recipe.model');

module.exports = routes => {
  
  // Get all recipes
  routes.get('/', async (req, res) => {
    let recipes = await Recipe.find().lean().exec();
    if(!recipes.length) return res.json({ error: 'No recipes added yet...' });

    return res.json(recipes);
  });

  // Add a new recipe
  routes.post('/admin/add-new-recipe', async (req, res) => {
    const exists = await Recipe.find({ name: req.body.name }).lean().exec();
    if (exists.length) return res.json({ error: 'A recipe with that name already exists!' });

    return new Recipe(req.body)
      .save()
      .then(object => res.json(object))
  })

  // Find a recipe by name, makes partial matches...
  routes.get('/find-by-name/:name', async (req, res) => {
    const recipe = await Recipe.find({ name: { "$regex": req.params.name, "$options": "i"} }).lean().exec();
    if (!recipe.length) return res.json({ error: 'No recipe with that name exists!' });
    
    return res.json(recipe);
  })

  // TODO:
  // Edit a recipe
  // Delete a recipe
  
  return routes
}
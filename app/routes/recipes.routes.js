const Recipe = require('../models/recipe.model');

module.exports = routes => {
  
  // Get all recipes
  routes.get('/', async (req, res) => {
    let recipes = await Recipe.find().lean().exec();
    if(!recipes.length) return res.json({ error: 'No recipes added yet...' });

    res.json(recipes);
  });

  // Add a new recipe
  routes.post('/add-recipe', async (req, res) => {
    const exists = await Recipe.find({ name: req.body.name }).lean().exec();
    if (exists.length) return res.json({ error: 'A recipe with that name already exists!' });

    return new Recipe(req.body)
      .save()
      .then(object => res.json(object))
  })
  
  return routes
}
const Recipe = require('../models/recipe.model');

module.exports = routes => {
  
  // Get all recipes
  routes.get('/', async (req, res) => {
    let recipes = await Recipe.find().lean().exec();
    if(!recipes) return res.json({ error: 'No recipes added yet...' });
    
    return res.json(recipes);
  });
  
  // Find a recipe by name, makes partial matches...
  routes.get('/find-by-name/:name', async (req, res) => {
    const recipe = await Recipe.find({ name: { "$regex": req.params.name, "$options": "i"} }).lean().exec();
    console.log('recipe: ', recipe)
    if (!recipe.length) return res.json({ error: 'No recipe with that name exists!' });
    
    return res.json(recipe);
  })
  
  /***** ADMIN ROUTES *****/
  // Add a new recipe
  routes.post('/admin/add-new-recipe', async (req, res) => {
    const exists = await Recipe.find({ name: req.body.name }).lean().exec();
    if (exists.length) return res.json({ error: 'A recipe with that name already exists!' });
    
    return new Recipe(req.body)
      .save()
      .then(object => res.json(object))
  })
  
  // Edit a recipe
  routes.put('/admin/edit/:name', async (req, res) => {
    const recipes = await Recipe.find({ name: req.params.name }).lean().exec();
    const recipeToUpdate = recipes[0];
    if (!recipeToUpdate) return res.json({ error: 'No recipe with that name exists!' });

    const updatedRecipe = Object.assign({}, recipeToUpdate, req.body);
    
    return Recipe.findByIdAndUpdate(recipeToUpdate._id, updatedRecipe, { new: true })
      .then(object => res.json(object));
  })
  
  // TODO:
  // Delete a recipe
  
  return routes
}
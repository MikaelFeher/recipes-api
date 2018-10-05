const Recipe = require('../models/recipe.model');

module.exports = routes => {
  // Add a new recipe
  routes.post('/recipe/add-new-recipe', async (req, res) => {
    const exists = await Recipe.find({ name: req.body.name }).lean().exec();
    if (exists.length) return res.json({ error: 'A recipe with that name already exists!' });
    
    return new Recipe(req.body)
      .save(err => {
        if(err) return res.json({ error: err })
        return res.json({ success: 'Success' })
      })
  });
  
  // Edit a recipe
  routes.put('/recipe/edit-recipe/:name', async (req, res) => {
    const recipes = await Recipe.find({ name: req.params.name }).lean().exec();
    const recipeToUpdate = recipes[0];
    if (!recipeToUpdate) return res.json({ error: 'No recipe with that name exists!' });

    const updatedRecipe = Object.assign({}, recipeToUpdate, req.body);
    
    return Recipe.findOneAndUpdate({ _id: recipeToUpdate._id }, updatedRecipe, { new: true })
      .then(object => res.json(object));
  });
 
  // Delete a recipe
  routes.delete('/recipe/delete-recipe/:id', async (req, res) => {
    const { id } = req.params
    return Recipe.findOneAndRemove({ _id: id }).exec()
      .then(res.json(`Recipe with id: ${id} was successfully deleted.`));
  });

  return routes
}
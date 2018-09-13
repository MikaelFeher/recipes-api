const ingredients = require('../json/livsmedelsdata.json');

module.exports = (routes) => {
  
  // Get all ingredients
  routes.get('/', (req, res) => {
    res.json(ingredients);
  });
  
  // Get the first 5 ingredients...
  routes.get('/first-five', (req, res) => {
    res.json(ingredients.slice(0, 5));
  });
  
  // Find ingredients by name...
  routes.get('/find-by-name/:name', (req, res) => {
    let name = req.params.name.toLowerCase();
    if(name.length < 2) return res.json({ error: 'Name must contain atleast 2 characters.' });
    
    let result = ingredients.filter(ingredient => ingredient.Namn.toLowerCase().indexOf(name) == 0)
      .map(ingredient => ingredient.Namn)
    
    return res.json(result);
  });
  
  return routes
}
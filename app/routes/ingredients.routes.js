const ingredients = require('../json/livsmedelsdata.json');

module.exports = (routes) => {
  routes.get('/', (req, res) => {
    res.json({ message: 'This will display ingredients...' });
    // res.json(ingredients);
  })
}
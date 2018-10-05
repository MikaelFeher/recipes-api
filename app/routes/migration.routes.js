/* ONLY NECESSARY FOR MIGRATING INGREDIENTS FROM JSON-FILE TO DATABASE */

// const ingredientsMigration = require('../migration/ingredients.migration');

// module.exports = routes => {
  
//   /***************************************************************************/
  
//   /***** ONLY USE ONCE TO MIGRATE INGREDIENTS FROM JSON-FILE TO DATABASE *****/
//   routes.get('/ingredients/migrate', (req, res) => {
//     ingredientsMigration.migration()
//       .catch(err => res.json(err))
//   })
  
//   return routes;
// }
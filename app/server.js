const express = require('express');
const app = express();

const ingredientRoutes = require('./routes/ingredients.routes')(express.Router());

app.use('/ingredients', ingredientRoutes);

app.get('/', (req, res) => {
  res.send('HELLO!');
})

app.listen(3003, () => console.log('Listening on 3003'));
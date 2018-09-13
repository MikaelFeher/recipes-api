const express = require('express');
const app = express();

const ingredientsRoutes = require('./routes/ingredients.routes')(express.Router());

app.use('/ingredients', ingredientsRoutes);

app.get('/', (req, res) => {
  res.send('HELLO!');
})

app.listen(3003, () => console.log('Listening on 3003'));
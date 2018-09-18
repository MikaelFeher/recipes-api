const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ingredientsRoutes = require('./routes/ingredients.routes')(express.Router());
const recipesRoutes = require('./routes/recipes.routes')(express.Router());

// DB connection
mongoose.connect('mongodb://localhost:27017/RecipeProject', { useNewUrlParser: true });

// CORS
app.use(cors());

// JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/ingredients', ingredientsRoutes);
app.use('/recipes', recipesRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('HELLO!');
})

// Catch all route...
app.get('/*', (req, res) => {
  res.sendStatus(418).end();
})

app.listen(3003, () => console.log('Listening on 3003'));
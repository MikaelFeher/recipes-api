const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ingredientsRoutes = require('./routes/ingredients.routes')(express.Router());
const recipesRoutes = require('./routes/recipes.routes')(express.Router());
const seedUser = require('./config/seedUser');


// DB connection
mongoose.connect('mongodb://localhost:27017/RecipeProject', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

// CORS
app.use(cors());

// JSON
app.use(bodyParser.urlencoded({ limit:'50mb', extended: false }));
app.use(bodyParser.json({ limit:'50mb', extended: false }));

// Create admin user
seedUser();

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
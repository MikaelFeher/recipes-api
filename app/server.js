const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const extractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user.model');
const ingredientsRoutes = require('./routes/ingredients.routes')(express.Router());
const recipesRoutes = require('./routes/recipes.routes')(express.Router());
const adminRoutes = require('./routes/admin.routes')(express.Router());
const seedUser = require('./config/seedUser');

// DB CONNECTION
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

// CORS
app.use(cors());

// SECURITY
const opts = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new JwtStrategy(opts, (payload, next) => {
  User.findById({ _id: payload._id }).lean().exec().then(result => {
    next(null, result);
  });
});

passport.use(strategy);
app.use(passport.initialize());

// JSON
app.use(bodyParser.urlencoded({ limit:'50mb', extended: false }));
app.use(bodyParser.json({ limit:'50mb', extended: false }));

// CREATE ADMIN USER
seedUser();

// ROUTES
app.use('/ingredients', ingredientsRoutes);
app.use('/recipes', recipesRoutes);
app.use('/admin', passport.authenticate('jwt', { session: false }), adminRoutes);

app.post('/login', async (req, res) => {
  if(!req.body.username || !req.body.password) return res.status(400).json({ error: 'Missing email or password in the request.' })

  const user = await User.findOne({ username: req.body.username }).lean().exec();
  if(!user) return res.status(400).json({ error: 'The username does not exist!' })
  if(!user) return console.log('Username does not exist');

  passwordMatch = await bcrypt.compare(req.body.password, user.password)
  if(!passwordMatch) return res.status(401).json({ error: 'Wrong password!' }) 
  
  const payload = { _id: user._id };
  const token = jwt.sign(payload, process.env.SECRET_OR_KEY)
  const loggedInUser = {
    _id: user._id,
    isAdmin: user.isAdmin,
    token
  }
  res.json({ user: loggedInUser })
})

// TEST PROTECTED ROUTE
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: "Hey Hey, I'm authenticated!" });
})

// ROOT ROUTE
app.get('/', (req, res) => {
  res.send('HELLO!');
})

// CATCH ALL ROUTE...
app.get('/*', (req, res) => {
  res.sendStatus(418).end();
})

app.listen(port, () => console.log('Listening on 3003'));
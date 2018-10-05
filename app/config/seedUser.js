const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createAdmin() {
  const admin = await User.findOne({ username: 'admin' }).lean().exec();
  const passwordHash = await bcrypt.hash('admin', saltRounds);
  
  if(!admin) {
    return new User({
      username: 'admin',
      password: passwordHash,
      isAdmin: true
    }).save((err, res) => {
      if(err) return console.log(err)
      return console.log('Admin successfully created!')
    })
  }
}

module.exports = createAdmin
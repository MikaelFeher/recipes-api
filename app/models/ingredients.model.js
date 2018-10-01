//TODO: Implement an ingredient model and read in the ./json/livsmedelsdata.json to mongo.
const mongoose = require('mongoose');

const customValidator = [uniqueName, 'Name exists']

const schema = mongoose.Schema({
  name: {
    type: String,
    // validate: customValidator
  },
  category: String,
  WeightGram: String,
  nutritionalValues: [{
    _id: false,
    name: String,
    abbreviation: String,
    value: Number,
    unit: String
  }]
}
)

function uniqueName(val) {
  const exists = this.find({ name: val }).exec()

  return !exists;
}
// schema.pre('save', async function (doc, next) {
//   let self = this;
//   const exists = await self.find({ name: doc.name }).lean().exec()

//   if(exists){
//     console.log('user exists: ',self.name);
//     next(new Error("User exists!"));
//     return;
//   }

//   next();
//   // var self = this;
//   // self.find({ name : self.name }, function (err, docs) {
//   //     if (!docs.length){
//   //         next();
//   //     }else{                
//   //         console.log('user exists: ',self.name);
//   //         next(new Error("User exists!"));
//   //     }
//   // })
//   // .catch(err => console.log(err))
// }) ;

module.exports = mongoose.model('Ingredient', schema);

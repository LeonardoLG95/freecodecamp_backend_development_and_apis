require('dotenv').config()
/* Exec mongodb on docker for testing
docker run --name mongo-db -d -p 27017:27017 -v /data mongo
*/
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

let personSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  age: { type: number, required: true }
}
)

const createAndSavePerson = (done) => {
  done(null /*, data*/)
}

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/)
}

const findPeopleByName = (personName, done) => {
  done(null /*, data*/)
}

const findOneByFood = (food, done) => {
  done(null /*, data*/)
}

const findPersonById = (personId, done) => {
  done(null /*, data*/)
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"

  done(null /*, data*/)
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20

  done(null /*, data*/)
}

const removeById = (personId, done) => {
  done(null /*, data*/)
}

const removeManyPeople = (done) => {
  const nameToRemove = "Mary"

  done(null /*, data*/)
}

const queryChain = (done) => {
  const foodToSearch = "burrito"

  done(null /*, data*/)
}

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person
exports.createAndSavePerson = createAndSavePerson
exports.findPeopleByName = findPeopleByName
exports.findOneByFood = findOneByFood
exports.findPersonById = findPersonById
exports.findEditThenSave = findEditThenSave
exports.findAndUpdate = findAndUpdate
exports.createManyPeople = createManyPeople
exports.removeById = removeById
exports.removeManyPeople = removeManyPeople
exports.queryChain = queryChain

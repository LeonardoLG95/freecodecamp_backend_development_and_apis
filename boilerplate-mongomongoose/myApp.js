require('dotenv').config()
const { Int32 } = require('mongodb')
/* Exec mongodb on docker for testing
docker run --name mongo-db -d -p 27017:27017 -v /data mongo
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err)
})

const personSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  favoriteFoods: [String]
}
)

const Person = mongoose.model("Person", personSchema)

const createAndSavePerson = (done) => {
  let johnDoe = new Person({ name: "John Doe", age: 56, favoriteFoods: ["vegetables", "eggs"] })

  johnDoe.save((err, person) => {
    if (err) return console.error(err)
    done(null, person)
  })
}

let arrayOfPeople = [
  { name: "John", age: 36, favoriteFoods: ["fish"] },
  { name: "John Doe Doe", age: 42, favoriteFoods: ["fish", "John"] }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err)
    done(null, people)
  })
}

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err)

    person.favoriteFoods.push(foodToAdd)
    person.save((err, person) => {
      if (err) return console.error(err)
      done(null, person)
    })
  })
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20
  Person.findOneAndUpdate({ name: personName },
    { age: ageToSet },
    { new: true },
    (err, person) => {
      if (err) return console.error(err)
      done(null, person)
    })
}

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) return console.error(err)
    done(null, person)
  })
}

const removeManyPeople = (done) => {
  const nameToRemove = "Mary"

  Person.remove({ name: nameToRemove }, (err, person) => {
    if (err) return console.error(err)
    done(null, person)
  })
}

const queryChain = (done) => {
  const foodToSearch = "burrito"
  Person.find({ favoriteFoods: foodToSearch })
    .select({ name: 1, favoriteFoods: 1 }) /*0 hide 1 show*/
    .sort({ name: 1 }) /*1 ascending -1 descending*/
    .limit(2)
    .exec((err, people) => {
      if (err) return console.error(err)
      done(null, people)
    })
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

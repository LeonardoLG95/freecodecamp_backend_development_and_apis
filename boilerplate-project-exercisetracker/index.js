require('dotenv').config()
let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')

let mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err)
})

let userSchema = new Schema({
  username: { type: String, required: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  log: [Object]
}, { versionKey: false })

const User = mongoose.model("User", userSchema)

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const base_endpoint = process.env.BASE_ENDPOINT
const logs_endpoint = process.env.LOGS_ENDPOINT
const exercise_endpoint = process.env.EXERCISE_ENDPOINT

app.route(base_endpoint)
  .post((req, res) => {
    let user = new User({ username: req.body.username })

    user.save((err, user) => {
      if (err) return console.error(err)
      res.json({ _id: user._id, username: user.username })
    })
  })
  .get((req, res) => {
    User.find().select({ log: 0 }).exec((err, users) => {
      if (err) console.log(err)
      res.send(users)
    })
    // User.deleteMany().exec()
  })

app.get(
  base_endpoint + logs_endpoint,
  (req, res) => {
    console.log(res.query)
    let id = req.params._id

    User.findById(id, (err, user) => {
      if (err) return console.error(err)

      if (!user) res.json({ error: 404 })
      let response = Object.assign({}, { count: user.log.length },
        { _id: user._id, username: user.username, log: user.log })

      let from = req.query.from
      let to = req.query.to
      let limit = req.query.limit

      if (from || to || limit) {
        from = new Date(from)
        to = new Date(to)
        limit = Number(limit)

        let log = response.log

        for (i = 0; i < log.length; i++) {
          if (from != 'Invalid Date' && log[i].date < from) {
            log.pop(i)
          }
          else if (to != 'Invalid Date' && log[i].date > to) {
            log.pop(i)
          }
        }

        if (limit) {
          log = log.slice(0, limit)
        }
        response.count = log.length
        response.log = log
      }

      for (i = 0; i < response.log.length; i++) {
        response.log[i].date = response.log[i].date.toDateString()
      }

      res.json(response)
    })
  }
)

app.post(base_endpoint + exercise_endpoint,
  (req, res) => {
    let id = req.params._id
    let exercise = {
      description: req.body.description,
      duration: Number(req.body.duration),
    }

    let date = new Date(req.body.date)
    if (!date || date == 'Invalid Date') date = new Date(Date.now())
    exercise.date = date


    User.findById(id, (err, user) => {
      if (err) return console.error(err)

      user.log.push(exercise)
      user.save((err, user) => {
        if (err) return console.error(err)

        exercise.date = exercise.date.toDateString()
        let response = Object.assign({},
          { username: user.username, _id: user._id }, exercise)
        res.json(response)
      })
    })
  })

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
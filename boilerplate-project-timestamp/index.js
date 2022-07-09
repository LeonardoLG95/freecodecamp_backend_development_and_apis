require('dotenv').config()
const express = require('express')
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 }))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get(
  "/api/:date?",
  (req, res) => {
    let date_param = req.params.date
    let date = null
    let date_unix = null
    let date_utc = null
    let response = null

    if (date_param) {
      if (isNaN(date_param)) date = new Date(date_param)
      else {
        date_param = Number(date_param)
        date = new Date(Number(date_param))
      }

      if (date.toUTCString() == "Invalid Date") response = { error: "Invalid Date" }
      else {
        date_unix = isNaN(date_param) ? date.getTime() : date_param
        date_utc = date.toUTCString()
      }
    }
    else {
      date = new Date(Date.now())
      date_unix = date.getTime()
      date_utc = date.toUTCString()
    }

    if (!response) response = { unix: date_unix, utc: date_utc }

    res.json(response)
  }
)

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

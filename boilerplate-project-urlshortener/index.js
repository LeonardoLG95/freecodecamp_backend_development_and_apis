require('dotenv').config()
const port = process.env.PORT || 3000

let cors = require('cors')
let express = require('express')
let bodyParser = require('body-parser')

const validUrl = require('valid-url')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  '/public',
  express.static(`${process.cwd()}/public`)
)

app.get(
  '/',
  (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html')
  }
)

var directions = {}
var lastShortUrl = 1
app.post(
  '/api/shorturl',
  (req, res) => {
    console.log(req.body)
    let url = req.body.url

    if (validUrl.isWebUri(url)) {
      directions[lastShortUrl] = url
      let short = lastShortUrl
      lastShortUrl += 1

      res.json({ original_url: url, short_url: short })
    }
    else res.json({ error: 'invalid url' })
  }
)

app.get(
  '/api/shorturl/:shortUrl?',
  (req, res) => {
    let redirection = req.params.shortUrl

    if (redirection) {
      res.redirect(directions[redirection])
      res.end()
    }
  }
)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

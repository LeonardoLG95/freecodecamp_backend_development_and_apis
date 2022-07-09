require('dotenv').config()

let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let multer = require('multer')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post(
  '/api/fileanalyse',
  upload.single('upfile'),
  (req, res) => {
    console.log(req.file, req.body)

    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  })

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})

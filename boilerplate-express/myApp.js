require('dotenv').config()

let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static(__dirname + "/public"))
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next()
})

app.get('/string', (req, res) => {
    res.send("Hello Express")
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE == "uppercase") {
        res.json({ message: "HELLO JSON" })
    }
    else {
        res.json({ message: "Hello json" })
    }
})

app.get(
    '/now',
    (req, res, next) => {
        console.log(req)
        next()
    },
    (req, res) => {
        res.json({ time: new Date().toString() })
    }
)

app.get(
    '/:word/echo',
    (req, res) => {
        res.json({ echo: req.params.word })
    }
)

/*app.get(
    '/name',
    (req, res) => {
        res.json({ name: `${req.query.first} ${req.query.last}` })
    }
)*/

app.post(
    '/name',
    (req, res) => {
        res.json({
            name: `${req.body.first} ${req.body.last}`
        })
    }
)






























module.exports = app;
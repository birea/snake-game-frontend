const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080
const build = process.env.DIR || '../build'

app.use(express.static(path.join(__dirname, build)))
app.use(favicon(path.join(__dirname, build, 'images', 'favicon.png')))

app.get('/ping', function (req, res) {
    return res.send('pong')
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, build, 'index.html'))
})

app.listen(port)
const express = require('express')

require('dotenv').config()

const path = require('path')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static('client'))

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'cf85e52698a24ea1aba5803a8ed22cd1',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/styles.css'))
})



app.listen(port, () => {
    console.log('listening on port ' + port)
})
const express = require('express')

require('dotenv').config()

const path = require('path')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
//app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/styles.css'))
})



app.listen(port, () => {
    console.log('listening on port ' + port)
})
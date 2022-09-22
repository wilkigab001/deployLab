const express = require('express')

require('dotenv').config()

const path = require('path')

const cors = require('cors')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static('client'))
app.use(cors())

let monkeys = ['monkey', 'donkey', 'mario', 'monk monk']

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
    rollbar.warning('Css has been deployed')
})

app.get('/api/monkeys', (req, res) => {
    res.status(200).send(monkeys)
})

app.post('/api/monkeys', (req, res) => {
    let {name} = req.body

    const index = monkeys.findIndex(monkey => {
        return monkey === name
    })

    try {
        if (index === -1 && name !== '') {
            students.push(name)
 
            rollbar.log('Student was added successfully')
            res.status(200).send(students)
         } else if (name === ''){
             res.status(400).send('You must enter a name.')
             rollbar.error('enter a name broski')
         } else {
             res.status(400).send('That student already exists.')
             rollbar.error('Student already exists')
        }
    } catch (err) {
        console.log(err)
    }
})

app.delete('/api/monkeys/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    monkeys.splice(targetIndex, 1)
    rollbar.info('Monkey was deleted')
    res.status(200).send(monkeys)
})


try{
    nonExistentFunction()
}catch(error){
    rollbar.error(error.message)
}

app.listen(port, () => {
    console.log('listening on port ' + port)
})
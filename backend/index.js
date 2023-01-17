require('dotenv').config()

const getDrones = require('./routes/drones')
const express = require('express')
const app = express()
const cors = require('cors')
const Pilot = require('./models/pilot')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('build'))


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/pilots', (req, res) => {
  Pilot.find({}).then(pilots => {
    res.json(pilots)
  })
})

app.get('/drones', (req, res) => {
  res.send(getDrones())
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
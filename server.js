const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const utils = require('./common/utils')
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 8081

const router = express.Router()

// EMPLOYEE

const employees = JSON.parse(fs.readFileSync('./mock/employees.json'))

router.get('/employee', (req, res) => {
  return res.json(employees)
})

router.get('/employee/newhires', (req, res) => {
  return res.json(utils.sample(6, employees))
})

router.get('/employee/birthday', (req, res) => {
  return res.json(utils.sample(2, employees))
})

// MESSAGES

const messages = JSON.parse(fs.readFileSync('./mock/message.json'))

router.get('/message', (req, res) => {
  return res.json(messages)
})

router.get('/message/latest', (req, res) => {
  return res.json(utils.sample(1, messages))
})

// IMAGES

const images = JSON.parse(fs.readFileSync('./mock/images.json'))

router.get('/images', (req, res) => {
  return res.json(
    images.map(image => ({
      id: image.id,
      url: utils.getPublicURI(req) + image.url
    }))
  )
})

app.use('/api', router)
app.listen(port)

console.log('API kjører på port ' + port + ', Lykke til  👊🏼')

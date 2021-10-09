const express = require('express')
const authController = require('../controllers/auth')
const api = express.Router()
const auth = require('../middlewares/auth')

//Routes
api.get('/', (_, res) => {
  res.send({ message: 'CURSO QA' })
})
//Login
api.post('/users/register', authController.register)
api.post('/users/login', authController.login)
api.get('/users/confirm/:code', authController.confirmMail)

api.use(auth)
api.get('/test', (_, res) => {
  res.send({ message: "Test autenticado" })
})

module.exports = api

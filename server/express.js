const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./dbQueries')
const port = 5000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/accounts', db.getUsers)
app.get('/accounts/:id', db.getUserById)
app.post('/accounts', db.createUser)
app.put('/accounts/:id', db.updateUser)
app.delete('/accounts/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
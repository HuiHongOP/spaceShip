const router = require('express').Router()
const db = require('./usersQueries')

router.get('/accounts', db.getUsers)
router.get('/accounts/:id', db.getUserById)
router.post('/accounts', db.createUser)
router.put('/accounts/:id', db.updateUser)
router.delete('/accounts/:id', db.deleteUser)

module.exports = router;
const router = require('express').Router()
const { authenticateToken } = require('../auth')
const db = require('../queries/usersQueries')

router.get('/accounts',authenticateToken, db.getUsers)
router.get('/accounts/:id', authenticateToken, db.getUserById)
// CREATE USER
router.post('/accounts', db.createUser)
router.put('/accounts/:id', authenticateToken, db.updateUser)
router.delete('/accounts/:id', authenticateToken, db.deleteUser)
router.post('/login', db.login)
router.get('/refresh_token', db.refresh_token)
router.delete('/refresh_token', db.del_refresh_token)

module.exports = router;
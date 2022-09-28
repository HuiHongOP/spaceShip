const router = require('express').Router()
const db = require('../queries/cartQueries')
const { verifyTokenAndAdmin, authenticateToken } = require('../auth')
// get user cart
router.get('/carts/:userid', authenticateToken, db.cart_by_id)
// get all carts for all users
router.get('/carts', verifyTokenAndAdmin, db.get_cart)
// update carts
router.put('/carts/:cartid',authenticateToken, db.update_cart)
// create cart
router.post('/carts',authenticateToken, db.create_cart)
// delete cart
router.delete('/cart', authenticateToken, db.delete_cart)
module.exports = router;
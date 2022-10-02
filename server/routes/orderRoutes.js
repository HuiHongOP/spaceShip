const router = require('express').Router()
const { authenticateToken, verifyTokenAndAdmin } = require('../auth')
const db = require('../queries/orderQueries')

// get user order
router.get('/order/:userid',authenticateToken, db.order_by_id)
// get all order for all users
router.get('/order',verifyTokenAndAdmin, db.get_orders)
// update order
router.put('/order/:cartid',verifyTokenAndAdmin, db.update_order)
// create order
router.post('/order',authenticateToken, db.create_order)
// delete order
router.delete('/order',verifyTokenAndAdmin, db.delete_order)

module.exports = router;
const router = require('express').Router()
const db = require('./productQueries')

// get all products order by ID
router.get('/product', db.getProducts)
// get product by ID
router.get('/product/:id', db.getProductById)
// post new products
router.post('/product', db.createProduct)
// update product by ID
router.put('/product/:id', db.updateProduct)
// delete product by ID
router.delete('/product/:id', db.deleteProductById)

module.exports = router;
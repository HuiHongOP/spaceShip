const router = require('express').Router()
const { verifyTokenAndAdmin, authenticateToken } = require('../auth')
const db = require('../queries/productQueries')

// get all products order
router.get('/product', db.getProducts)
// get product by ID
router.get('/product/:id', db.getProductById)
// post new products
router.post('/product',verifyTokenAndAdmin, db.createProduct)
// update product by ID
router.put('/product/:id',verifyTokenAndAdmin, db.updateProduct)
// delete product by ID
router.delete('/product/:id',verifyTokenAndAdmin, db.deleteProductById)
// filter categories
router.get('/product_filter', db.filterCategorie)

module.exports = router;
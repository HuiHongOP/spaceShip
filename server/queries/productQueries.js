const pool = require('../config')
// queries for product route

// get all products
const getProducts = (req,res) => {
    pool.query(
        "SELECT * FROM product ORDER BY id", (error, result) => {
            if (error) {
                throw error
            }
            res.status(200).json(result.rows)
        }
    )
}

// create product
const createProduct  = (req,res) => {
    const {title, descr, img, categories, size, price} = req.body
    //const password = CryptoJS.AES.encrypt(req.body, 'Secrete Phrase')

    pool.query('INSERT INTO product (title, descr, img, categories, size, price) VALUES ($1,$2,$3,$4,$5,$6)', [title, descr, img, categories, size, price],
        (error,result) =>{
            if(error){
                throw error
            }
            res.status(201).send(`Created product: ${title}`)
        })
}

// get product by categorie
const filterCategorie = async (req, res) => {
    try {
        let categories = req.query.categories;
        if (!Array.isArray(categories)) {
            categories = [categories]
        }
        let string = ''
        let num_incre = 0
        for (let i = 0; i < categories.length; i++) {
            num_incre += 1
            string += '$' + num_incre.toString() + '=' + 'ANY(categories)'
            if ( i != categories.length-1) {
                string += ' and '
            } 
        }
        const filter = await pool.query(`SELECT * FROM product WHERE ${string}`, categories);
        res.send(filter.rows)
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
}   

// update product
const updateProduct = (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    const id = req.params.id
    const {title, descr, img, categories, size, price} = req.body
    pool.query(
        'UPDATE product SET title = $1, descr = $2, img = $3, categories = $4, size = $5, price = $6',[title, descr, img, categories, size, price],(error,result) => {
            if(error) {
                throw error
            }
            res.status(200).send(`Product modified with ID: ${id}`)
        }
    )
}

// get product by ID
const getProductById = (req,res) => {
    const id = req.params.id
    pool.query(
        "SELECT * FROM product WHERE id = $1", [id], (err, result) => {
            if (err) {
                throw err
            }
            res.status(201).json(result.rows)
        }
    )
}

// delete product by ID
const deleteProductById = (req, res) => {
    const id = req.params.id
    pool.query(
        "DELETE FROM product WHERE id = $1", [id], (error, result) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Product with id: ${id} deleted`)
        }
    )
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProductById,
    filterCategorie
}

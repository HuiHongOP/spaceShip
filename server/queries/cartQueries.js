const pool = require('../config')

// get cart by user's id
const cart_by_id = async (req,res) => {
    try {
        const userid = req.params.userId
        const cart = await pool.query('SELECT * FROM cart WHERE userid = $1',[userid]);
        res.status(200).json(cart.rows)
    }
    catch(error) {
        res.status(500).json({error:error.message})
    }
}

// get all cart
const get_cart = async (req,res) => {
    try{ 
        const carts = await pool.query('SELECT * FROM cart')
        res.status(200).send(carts.rows);
    }
    catch(error) {
        res.status(500).json({error:error.message});
    }
}

// create carts
const create_cart = async(req,res) => {
    try {
        const {userid,products} = req.body
        const cart = await pool.query('INSERT INTO cart (userid, products) VALUES ($1, $2)',[userid, products]);
        res.status(200).send(cart.rows)
    }
    catch(error) {
        res.status(500).json({error:error.message});
    }
}

// update cart
const update_cart = async(req,res) => {
    try {
        const cart_id = req.params.cartid;
        //console.log(`the fckin cart_id: ${cart_id}`)
        const product = req.body.items.items.product
        const qty = req.body.items.items.qty
        //const query = `UPDATE cart SET items = jsonb_set(items, '{items, product}' ,' + product + ', false) WHERE id = ' + cart_id + ')`
        const cart = await pool.query(`UPDATE cart SET items = jsonb_set(items, '{items, product}', '"${product}"', false) WHERE id = $1`,[cart_id]);
        const quantity = await pool.query(`UPDATE cart SET items = jsonb_set(items, '{items, qty}', '${qty}', false) WHERE id = $1`,[cart_id])
        //const cart = await pool.query(query)
        res.status(200).send(`Cart has been updated`)
    }
    catch(error) {
        res.status(500).json({error:[error.message,error]});
    }
}

// delete cart
const delete_cart = async (req,res) => {
    try {
        const id = req.params.id
        const cart = await pool.query("DELETE FROM cart WHERE id = $1", [id])
        res.status(200).send(cart.rows)
    }
    catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports ={
    cart_by_id,
    get_cart,
    create_cart,
    update_cart,
    delete_cart,
}
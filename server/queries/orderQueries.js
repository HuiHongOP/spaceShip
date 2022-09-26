const pool = require('../config')

// get cart by user's id
const order_by_id = async (req,res) => {
    try {
        const userId = req.params.userid
        const cart = await pool.query('SELECT * FROM orders WHERE userid = $1',[userId]);
        res.status(200).json(cart.rows[0])
    }
    catch(error) {
        res.status(500).json({error:error.message})
    }
}

// get all cart
const get_orders = async (req,res) => {
    try{ 
        const carts = await pool.query('SELECT * FROM orders ORDER BY id')
        res.status(200).send(carts.rows);
    }
    catch(error) {
        res.status(500).json({error:error.message});
    }
}

// create carts
const create_order = async(req,res) => {
    try {
        const {userid,items,amount,address} = req.body
        const order = await pool.query('INSERT INTO orders (userid, products, amount, address) VALUES ($1, $2, $3, $4)',[userid,items,amount,address]);
        res.status(200).send(order.rows)
    }
    catch(error) {
        res.status(500).json({error:error.message});
    }
}

// update cart
const update_order = async(req,res) => {
    try {
        const order_id = req.params.id;
        const {userid, items, amount, address} = req.body
        const order = await pool.query('UPDATE cart SET userid = $1, items = $2, amount= $3, address = $4 WHERE ID = $5', [userid, items, amount, address, order_id]);
        res.status(200).send(order.rows)
    }
    catch(error) {
        res.status(500).json({error:error.message});
    }
}

// delete cart
const delete_order = async (req,res) => {
    try {
        const id = req.params.id
        const order = await pool.query("DELETE FROM orders WHERE id = $1", [id])
        res.status(200).send(order.rows)
    }
    catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports ={
    order_by_id,
    get_orders,
    create_order,
    update_order,
    delete_order
}
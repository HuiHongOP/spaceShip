const axios = require('axios').default;

/*
    order_by_id,
    get_orders,
    create_order,
    update_order,
    delete_order
*/

const getOrderById = (id) => {
    axios.get(`https://spaceshipacc.herokuapp.com/api/orders/${id}`)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    }) 
}

const getOrders = () => {
    axios.get(`https://spaceshipacc.herokuapp.com/api/orders`)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

const createOrder = (orderid,userid,items,amount,address) => {
    axios.post(`https://spaceshipacc.herokuapp.com/api/orders/${orderid}`,
    {
        userid: userid,
        items: items,
        amount: amount,
        address: address,
    })
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

const updateOrder = (orderid,userid,items,amount,address) => {
    axios.put(`https://spaceshipacc.herokuapp.com/api/orders/${orderid}`, {
        userid: userid,
        items: items,
        amount: amount,
        address: address,
    })
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

const deleteOrder = (orderid) => {
    axios.delete(`https://spaceshipacc.herokuapp.com/api/orders/${orderid}`)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

module.exports = {
    getOrderById,
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
}
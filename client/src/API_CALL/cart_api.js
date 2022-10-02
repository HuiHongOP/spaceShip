const axios = require('axios').default;

/*
    cart_by_id,
    get_cart,
    create_cart,
    update_cart,
    delete_cart,
}
*/

const getCartById = (id) => {
    axios.get(`https://spaceshipacc.herokuapp.com/api/cart/${id}`)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    }) 
}

const getCart = () => {
    axios.get(`https://spaceshipacc.herokuapp.com/api/cart`)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

const createCart = (userid, products) => {
    axios.post(`https://spaceshipacc.herokuapp.com/api/cart`,
    {
        userid: userid,
        products: products
    })
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

const updateCart = (id, items) => {
    axios.put(`https://spaceshipacc.herokuapp.com/api/cart/${id}`, {
        items: items
    })
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

const deleteCart = (id) => {
    axios.delete(`https://spaceshipacc.herokuapp.com/api/cart/${id}`)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

module.exports = {
    getCart,
    getCartById,
    createCart,
    updateCart,
    deleteCart
}
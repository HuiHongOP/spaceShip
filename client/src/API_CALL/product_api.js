const axios = require('axios').default;

// get all products by id
const getProducts = () => {
    axios.get(`https://spaceshipacc.herokuapp.com/api/products`)
    .then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}

// get product by ID of product
const getProductById = (id) => {
    axios.get(`https://spaceshipacc.herokuapp.com/api/products/${id}`)
    .then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}

// create product
const postProduct = (title, descr, img, categories, size, price) => {
    axios.post(`https://spaceshipacc.herokuapp.com/api/products`, {
        title: title,
        descr: descr,
        img: img,
        categories: categories,
        size: size,
        price: price
    })
    .then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}

// update product by ID
const updateProduct = (title, descr, img, categories, size, price) => {
    axios.put(`https://spaceshipacc.herokuapp.com/api/products/${id}`,{
        title: title,
        descr: descr,
        img: img,
        categories: categories,
        size: size,
        price: price
    })
    .then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}


// delete product by ID
const deleteProduct = (id) => {
    axios.delete(`https://spaceshipacc.herokuapp.com/api/products/${id}`)
    .then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}

const filterCategory = (categories) => {
    axios.get(`https://spaceshipacc.herokuapp.com/api/products/product_filter`,{
        params: {
            categories: categories
        }
    })
    .then(response => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    })
}

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct,
    filterCategory
}
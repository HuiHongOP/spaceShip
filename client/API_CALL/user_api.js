/*
getUsers,
getUserById,
createUser,
updateUser,
deleteUser,
login,
refresh_token,
del_refresh_token
*/
const axios = require('axios').default;

// register user account
 const register = (username, email, password) => {
    axios.post('https://spaceshipacc.herokuapp.com/api/user/accounts', {
        username: username,
        email: email,
        password: password
    }).then(response => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    })
 }

//register('bobbyShmurda123','bobbyshmurda594293@spaceship.com','bobbyboy321')

// get all accounts
const getUsers = () => {
    axios.get('https://spaceshipacc.herokuapp.com/api/user/accounts')
    .then(response => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    })
}

// get user by id
const getUserById = () => {
    axios.get(`https://spaceshipacc.herokuapp.com/api/user/accounts/${id}`)
    .then (response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}
const updateUser = (password) => {
    axios.put(`https://spaceshipacc.herokuapp.com/api/user/accounts/${id}`, {
        password: password
    })
    .then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}

const deletUser = (id) => {
    axios.delete(`https://spaceshipacc.herokuapp.com/api/user/accounts/${id}`)
    .then(response =>
        console.log(response.data
    )).catch(error => {
        console.log(error)
    })
}

const login = (username, password) => {
    axios.post(`https://spaceshipacc.herokuapp.com/api/user/login`, {
        username: username,
        password: password
    })
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

const refresh_token = () => {
    axios.get(`https://spaceshipacc.herokuapp.com/api/user/refresh_token`)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

const logout = () => {
    axios.delete(`https://spaceshipacc.herokuapp.com/api/user/refresh_token`)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

module.exports = {
    register,
    getUsers,
    getUserById,
    updateUser,
    deletUser,
    login,
    refresh_token,
    logout
}
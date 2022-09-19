const pool = require('./config')
// get all users
const getUsers = (req,res) => {
   /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    pool.query('SELECT * FROM users ORDER BY ID', (error,result) => {
        if(error){
            throw error
        }
        res.status(200).json(result.rows)
    })
}

// get user by id
const getUserById = (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    const id = req.params.id
    console.log(id)
    pool.query('SELECT * FROM users WHERE id = $1',[id],(error,result) => {
        if(error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

// post new user 
const createUser = (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    const {name,email,password} = req.body
        //const password = CryptoJS.AES.encrypt(req.body, 'Secrete Phrase')

    pool.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)', [name,email,password],(error,result)=>{
        if(error){
            throw error
        }
        res.status(201).send(`Created ID: ${email}`)
    })
    
}

// update user
const updateUser = (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    const id = req.params.id
    const {password} = req.body
    pool.query(
        'UPDATE users SET password = $1',[password],(error,result) => {
            if(error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

// delete user
const deleteUser = (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    const id = req.params.id
    pool.query('DELETE FROM users WHERE id = $1',[id],(error,result)=>{
        if(error){  
            throw error
        }
        res.status(200).send(`User id ${id} deleted`) 
    })
}
// export modules 
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }
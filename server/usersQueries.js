const pool = require('./config')
const  bcrypt = require('bcrypt');
const jwtTokens = require('./utils/jwt_helper')
const jwt = require('jsonwebtoken')
const express = require('./express')
require('dotenv').config()
// get all users
const getUsers = async (req,res) => {
   /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    try {
        const users = await pool.query('SELECT * FROM users ORDER BY ID');
        res.json(users.rows);
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
}

// get user by id
const getUserById = (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    const id = req.params.id
    pool.query('SELECT * FROM users WHERE id = $1',[id],(error,result) => {
        if(error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

// post new user 
const createUser = async (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    try {
        const {username,email} = req.body
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query('INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *', [username,email,hashedPassword]);
        res.json({users:newUser.rows[0]});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

// update user
const updateUser = async (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    const id = req.params.id
    const {password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
        'UPDATE users SET password = $1 WHERE id = $2',[hashedPassword, id],(error,result) => {
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

const login = async (req,res) => {
    try {
        const {username,password} = req.body;
        const users = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (users.rows.length == 0) {
            return res.status(401).json({error: "Incorrect Credentials"})
        }
        console.log(users.rows[0])
        const validatePassword = await bcrypt.compare(password, users.rows[0].password);
        if (!validatePassword) {
            return res.status(401).json({error: "Incorrect Password"})
        }
        
        // JWT 
        let token = jwtTokens.jwtTokens(users.rows[0]);
        // refresh token send response as cookie
        res.cookie('refresh_token', token.refresh_token, {httpOnly:true});
        res.json(token);
       //res.status(200).send('success');
    }
    catch (error) {
        res.status(401).json({error: error.message});
    }
}

const refresh_token = async (req,res) => {
    try {
        const refresh_token = req.cookies.refresh_token
        console.log(refresh_token)
        if (refresh_token === null) {
            return res.status(401).json({error:'Null refresh token'});
        }
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (error, user) => {
            console.log(user)
            if (error) {
                return res.status(403).json({error: error.message});
            }
            const token = jwtTokens.jwtTokens(user)
            res.cookie('refresh_token', token.refresh_token, {httpOnly: true});
            res.json(token);
        })
    }
    catch (error) {
        return res.status(403).json({error: error.message});
    }
}

const del_refresh_token = (req,res) => {
    try{
        res.clearCookie('refresh_token')
        return res.status(200).json({message:'refresh_token cleared'})
    }
    catch {
        return res.status(403).json({error: error.message});
    }
}

// export modules 
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    refresh_token,
    del_refresh_token
  }
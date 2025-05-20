const express = require('express')
const ProfileRoute = express.Router()
const {ValidateToken} = require('../middlewares/Adminauth')

ProfileRoute.get('/profile'  , ValidateToken , async(req,res)=>{
    try{
          const users = req.user
           res.send(users)
    }catch(err){
        res.status(500).send('Error occured ' +err.message)
    }
})

module.exports = ProfileRoute
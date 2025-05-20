const express = require('express')
const ConnectionReq = express.Router()
const {ValidateToken} = require('../middlewares/Adminauth')

ConnectionReq.post('/SendFriendRequest' , ValidateToken ,  async(req,res)=>{

     const {firstName} = req.user
    try{
        res.send(  firstName + ' Send Request')
    }catch(err){
        res.status(400).send("Error " + err.message)
    }
})

module.exports = ConnectionReq
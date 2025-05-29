const express = require('express')
const UserRouter = express.Router()
const { ValidateToken } = require('../middlewares/Adminauth')
const Connection = require('../models/connection')

UserRouter.get('/user/request/recieved' , ValidateToken , async(req,res)=>{

    try{
        const LoginUser = req.user 

        const Reciever = await Connection.find({
            recieverid:LoginUser._id,
            status:'interested'
        }).populate('senderid' , ['firstName' , 'skills' , 'photo'])

        if(Reciever.length === 0){
            res.status(400).json({message:"NO User request is Found"})
        }
      
        res.send(Reciever)

    }catch(err){
        res.status(400).send('Error ' + err.message)
    }

} )





module.exports = UserRouter
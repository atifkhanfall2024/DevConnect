const express = require('express')
const ConnectionReq = express.Router()
const Connection = require('../models/connection')
const User = require('../models/user')
const {ValidateToken} = require('../middlewares/Adminauth')

ConnectionReq.post('/request/send/:status/:recieverid' , ValidateToken , async(req,res)=>{
    try{
        const status = req.params.status
        const recieverid = req.params.recieverid
        const senderid = req.user._id
       // console.log(status + ' ' + recieverid + ' ' + senderid);
           
        const model = new Connection({
            senderid ,recieverid , status
        })
      // only interested and ignore will allowed
        const Allow = ['interested' , 'ignore']

        if(!Allow.includes(status)){
            return res.status(400).json({message:'You enter status is incorrect'})
        }
       // a person cannot send request to yourself
        if(senderid.equals(recieverid)){
         return res.status(400).json({message:'You cannot send request to yourself'})
        }
        // when A send request to B then A cannot send back request to B and ALso Bcannot send request to A
        const ExistingConnection = await Connection.findOne({
            $or:[
                {senderid ,recieverid},
                {senderid:recieverid , recieverid:senderid}
            ],
        })
        if(ExistingConnection){
               return res.status(400).json({message:'Already Exist'})
        }

        // suppose someone enter dummy id so what happen ?
   
     const Userid = await User.findById(recieverid)
     if(!Userid){
        return res.status(404).json({message:'User cannot found'})
     }

        await model.save()
        res.send(req.user.firstName+ ' has '+ status + ' the request gracefully  ' + Userid.firstName)

    }catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports = ConnectionReq
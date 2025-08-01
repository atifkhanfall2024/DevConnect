const express = require('express')
const ConnectionReq = express.Router()
const mongoose = require('mongoose')
const Connection = require('../models/connection')
const User = require('../models/user')
const {ValidateToken} = require('../middlewares/Adminauth')
const Sendemail = require('../utils/sessendemail')


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
      const check =  await Sendemail.run(`A new friend Request from ${req.user.firstName}` ,req.user.firstName+ ' has '+ status + ' the request gracefully  ' + Userid.firstName )
      console.log('hi',check);

        res.send(req.user.firstName+ ' has '+ status + ' the request gracefully  ' + Userid.firstName)

    }catch(err){
        res.status(400).json({message:err.message})
    }
})

ConnectionReq.post('/request/review/:status/:reqid' , ValidateToken  , async(req,res)=>{
 
  try{
    const loginuser = req.user
   const Requestid = req.params.reqid
     const status = req.params.status

     const Allowed  = ['accepted' , 'rejected']
     if(!Allowed.includes(status)){
      return  res.status(400).json({message:'Invalid Status code'})
     }

    
     
     const ConnectionRequest = await Connection.findOne({
        _id:Requestid ,
        recieverid:loginuser._id,
        status:'interested'
        
     })
     
    // console.log(ConnectionRequest);

     if(!ConnectionRequest){
        return res.status(400).json({message:'Request not found in database'})
     }

      ConnectionRequest.status = status

      await ConnectionRequest.save()

      res.send(loginuser.firstName + ' ' + status + ' Connection request ')

  }catch(err){
      res.status(400).send(err.message)
  }

})

module.exports = ConnectionReq
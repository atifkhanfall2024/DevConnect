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
          return  res.status(400).json({message:"NO User request is Found"})
        }
      
        res.send(Reciever)

    }catch(err){
        res.status(400).send('Error ' + err.message)
    }

} )


UserRouter.get('/user/connections' , ValidateToken , async(req,res)=>{

   try{
        const LoginUser = req.user

const ConnectionAccepted= await Connection.find({
    $or:
   [ {recieverid:LoginUser._id , status:"accepted"} ,
    {senderid:LoginUser._id , status:"accepted"}
   ]
}).populate('senderid' , ['firstName' , 'skills' , 'photo' , 'age','about']) .populate('recieverid' ,['firstName' , 'skills' , 'photo' , 'age','about'] )

// only need sender information

const SenderandRecieverinfo = ConnectionAccepted.map((showinfo)=>{

    if(showinfo.recieverid._id === LoginUser._id){
        return showinfo.senderid
    }
    return showinfo.recieverid
})

if(!SenderandRecieverinfo){
    res.json('No Matching Found')
}
res.send(SenderandRecieverinfo)
   }catch(err){
    res.status(400).send('Error ' + err.message)
   }


})


module.exports = UserRouter
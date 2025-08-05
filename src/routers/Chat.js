const express = require('express')
const { ValidateToken } = require('../middlewares/Adminauth')
const { Chat } = require('../models/chat')
const Chats  = express.Router()



Chats.get('/chat/:touserid' , ValidateToken , async(req,res)=>{

  try{
         const touserid = req.params.touserid
         console.log(touserid);
           console.log(req.user._id);
         const loginuser = req.user._id
  
 let chat = await Chat.findOne({
          participents: {$all:[loginuser, touserid]},
         }).populate('messages.senderId'  , 'firstName')
        if(!chat){
            chat = new Chat({
            participents:[loginuser , touserid],
                messages:[]
            })
        }

        await chat.save()

        res.json(chat)

  }catch(err){
        res.status(401).send('No user found');
  }


} )


module.exports = Chats
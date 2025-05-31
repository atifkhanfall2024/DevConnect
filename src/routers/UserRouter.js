const express = require('express')
const UserRouter = express.Router()
const { ValidateToken } = require('../middlewares/Adminauth')
const Connection = require('../models/connection')
const User = require('../models/user')

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

UserRouter.get('/user/feed' , ValidateToken , async(req,res)=>{

  try{
      const LoginUser = req.user
      const page = parseInt(req.query.page) || 1
      let limit = parseInt(req.query.limit) || 10
      const skip = (page-1)*limit

      limit = limit>50?50:limit

   // console.log(LoginUser._id);
// first we find that a user send request to whom or recieve request from whom

const ConnectionRequestorResponse = await Connection.find({
     $or:[
        {senderid:LoginUser._id},
        {recieverid:LoginUser._id}
     ]
}).select('senderid recieverid')

const hindeUsersfromfeed = new Set()
ConnectionRequestorResponse.map((value)=>(
  hindeUsersfromfeed.add(  value.senderid.toString()),
   hindeUsersfromfeed.add(value.recieverid.toString())
    
))

// now  i fetch all information from database of user and strick checks on it that login user profile does not shown in feed api also the connection send or recieved also not shown 

const Users = await User.find({
    $and:[
        {_id:{$nin:Array.from(hindeUsersfromfeed)}},
        {_id:{$ne:LoginUser._id}},
        // we can set so many things here
       // {age:{$gt:23}}
       {skills:{$in:'Node.js'}}
    ]
}).select('firstName about skills photo').skip(skip).limit(limit)

res.json({data:Users})
  }catch(err){
    res.status(400).json({message:err.message})
  }

})


module.exports = UserRouter
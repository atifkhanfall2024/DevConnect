const express = require('express')
const ProfileRoute = express.Router()
const {ValidateToken} = require('../middlewares/Adminauth')
const ProfileEdit = require('../utils/UpdateProfile')
const verify = require('bcrypt')
const app = express()
const validator = require('validator')
app.use(express.json())

ProfileRoute.get('/profile/view'  , ValidateToken , async(req,res)=>{
    try{
          const users = req.user
           res.send(users)
    }catch(err){
        res.status(500).send('Error occured ' +err.message)
    }
})

ProfileRoute.patch('/profile/edit' , ValidateToken , async(req,res)=>{
    
      try{
       await ProfileEdit(req)

       const LoginUserData = req.user
      
   const data = await   Object.assign(LoginUserData, req.body);
      await data.save()
       
          
      // Object.keys(req.body).forEach((k)=> (LoginUserData[k]=req.body[k]))
       res.send(LoginUserData.firstName + ' Edit your profile Successfully')
      //  console.log(ProfileEdit(req))
      }catch(err){
        res.status(400).send(err.message)
      }
})

ProfileRoute.patch('/profile/passward' , ValidateToken , async(req,res)=>{
try{
 
const compare = await  verify.compare(req.body.passward , req.user.passward)
   if(!compare){
    throw new Error('Invalid passward')
   }
   console.log(req.body.newpassward)
   const newPass = req.body.newpassward
   // add new passward
   if(!validator.isStrongPassword(newPass)){
    throw new Error('Passward should be Strong')
   }
   const Hash  = await verify.hash(newPass , 10)
     req.user.passward = Hash 
    await req.user.save()

   res.send(req.user.firstName + ' Update the passward Successfully')
} catch(err){
  res.status(400).send(err.message)
}

 

})
module.exports = ProfileRoute
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Parser = require('cookie-parser')
require('dotenv').config(); 
const express=  require('express')
const app = express()

app.use(Parser())
// for login 
const ValidateToken  = async(req,res,next)=>{
  try{
   const cookie = req.cookies
   
   const {token} = cookie
   if(!token){
    return   res.status(401).json({ message: "Unauthorized" });
   }

   // if token is present then verfiy it 

   const verfiy = await jwt.verify(token, process.env.PrivateKey)
 

   const user = await User.findById(verfiy.id)
   if(!user){
    throw new Error('User not found')
   }
   req.user = user
   next()
  }
  catch(err){
    res.send("Error " +err.message)
  }
}
module.exports = {ValidateToken}
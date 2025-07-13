const express = require('express')
const Auth = express.Router()
const Data = require('../models/user')
const {IsValid , encrypt} = require('../utils/validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const {ValidateToken} = require('../middlewares/Adminauth')






Auth.post('/signup' , async(req,res)=>{
try{
    // to validation first we need to valid the user data
   IsValid(req)
 
const { passward } = req.body;

if (!validator.isStrongPassword(passward)) {
  throw new Error("Password is not strong!");
}

   const result = await encrypt({passward})
  // console.log(result);
   const {firstName , email  , age , gender , photo , about , skills } = req.body
 
    const user = new Data({
      firstName,
      email ,
      passward:result ,
      age,
      gender,
      photo,
      about,
      skills

    }) 

    // we also know here that user.save will return a promise so we need to handle it

    await  user.save()
   

    res.send( firstName + ' Signup successfully')
}
catch(err){
res.status(500).send('Your Data is against Schema' + err.message)
}
  
})

Auth.post('/login' , async(req,res)=>{
    try{
       const {email , passward} = req.body

       // findone return the whole document 
        const login = await Data.findOne({email:email})
       // console.log(login.passward);
        if(!login){
            throw new Error('invalid cradentails !')
        }

        const user = await bcrypt.compare(passward , login.passward)
        if(!user){
            throw new Error('invalid cradentails !')
        }

        // here we need that when a user login then create an jwt token by server which is wrap inside token
        
        const token = await jwt.sign({id:login._id} , process.env.PrivateKey , {expiresIn:'1d'})
       // console.log(token);

          // now the above token is wrap inside cookies
        res.cookie('token',token , { expires: new Date(Date.now() + 1 * 3600000)}) // cookies will changes with in 1 hours
        res.send(login.firstName   +  '   Login successfull ! ')
    }catch(err){
        res.status(500).send('Error Occured : '+err.message)
    }
})

Auth.post('/logout' , ValidateToken , async(req,res)=>{
    try{
      
              res.clearCookie('token').send('Logout successfully');
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
})

module.exports = Auth
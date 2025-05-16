const express = require('express')
const ConnectDb =  require('./config/Db')
const Data = require('./models/user')
const bcrypt = require('bcrypt')
const {IsValid , encrypt} = require('./utils/validation')
const cook = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {ValidateToken} = require('./middlewares/Adminauth')
require('dotenv').config(); 

const app = express()

// here we need a middle ware to reading the json data 

app.use(express.json())
// middleware for cookies
app.use(cook())

// suppose i need to login in a websites

app.post('/signup' , async(req,res)=>{
try{
    // to validation first we need to valid the user data
   IsValid(req)
   const result = await encrypt({passward:req.body.passward})
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
   

    res.send('User Signup successfully')
}
catch(err){
res.status(500).send('Your Data is against Schema' + err.message)
}
  
})

// now i wanna to make a login api that if the user want to login with an email and passward

app.post('/login' , async(req,res)=>{
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
        
        const token = await jwt.sign({id:login._id} , process.env.PrivateKey , {expiresIn:'7d'})

          // now the above token is wrap inside cookies
        res.cookie('token',token , { expires: new Date(Date.now() + 24 * 3600000)}) // cookies will changes with in 24 hours
        res.send(login.firstName   +  '   Login successfull ! ')
    }catch(err){
        res.status(500).send('Error Occured : '+err.message)
    }
})

// suppose if user want to go to /profile after validation 

app.get('/profile'  , ValidateToken , async(req,res)=>{
    try{
          const users = req.user
           res.send(users)
    }catch(err){
        res.status(500).send('Error occured ' +err.message)
    }
})
// supoose i check a specific user by email

// suppose i make an api request of sending the connection request

app.post('/SendFriendRequest' , ValidateToken ,  async(req,res)=>{

     const {firstName} = req.user
    try{
        res.send(  firstName + ' Send Request')
    }catch(err){
        res.status(400).send("Error " + err.message)
    }
})

app.get('/Login' ,async (req,res)=>{

    const emailId = req.body.email
   
    try{
     const user = await   Data.find({email:emailId})
     if(user.length===0){
        res.status(404).send('please signin the email that you mention is not present ')
     }else{
       // console.log(user[0].email);
        res.send(user)
     }

    }
    catch(err){
        
        res.status(404).send('Error occur during login')
    }
})

// get all users from data base 
app.get('/allusers' , async(req,res)=>{

   try{
    const Allusers = await Data.find({})
    if(Allusers.length===0){
        res.send('NO user is in database')
    }else{
        res.send(Allusers)  
    }
   
   }catch(err){
    res.send('Error occured !')
   }
})

// creating a delete api 

app.delete('/deleteuser', async(req,res)=>{

    const email = req.body.email
    
    try{
        const Deleteapi = await Data.deleteMany({email})
        console.log(Deleteapi);
       
        if(Deleteapi.length===0){
            res.send('No user in database')
        }else{
            res.send('User delete successfully')
        }
    }catch(err){
        res.send('warning 👽 error occured')
    }
})

// updating api
// we need to delete or update user by id bcz its more unique
app.patch('/update/:id' , async(req,res)=>{

     const id = req.params.id
     const data = req.body
// in update api first filter then update the data
     try{
        const update = await Data.findByIdAndUpdate({_id:id} , data ,{new:true ,  runValidators:true})
       // console.log(update);
      //api level validation

       const updateAllowed = ["age" , "gender", 'photo' , 'about' ,'skills']

       const IsUpdate = Object.keys(data).every((key)=>updateAllowed.includes(key))

         if(!IsUpdate){
            throw new Error("Not avalible update")
         }

        if(update.length !== 0){
            res.send('user update successfully')
        }else{
            res.send('No user found')
        }
     }catch(err){
        res.send('Error occured '+err.message)
     }
})

ConnectDb().then(()=>{
    console.log('Connection is success');
    app.listen(3000 , ()=>{
        console.log('server is listening.........');
    })
}).catch((err)=>{
    console.log('Data base connection is not eastablished');
})


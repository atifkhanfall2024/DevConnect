const express = require('express')
const ConnectDb =  require('./config/Db')
const Data = require('./models/user')
const cook = require('cookie-parser')
const Auth = require('./routers/AuthRoute')
const ProfileRoute = require('./routers/ProfileRouter')
const ConnectionReq = require('./routers/ConnectionRoute')
require('dotenv').config(); 
const app = express()
app.use(express.json())
app.use(cook())
app.use('/',Auth)
app.use('/' , ProfileRoute)
app.use('/', ConnectionReq)

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


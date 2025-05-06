const express = require('express')
const ConnectDb =  require('./config/Db')
const Data = require('./models/user')

const app = express()

// suppose i need to login in a websites

app.post('/login' , async(req,res)=>{

    // with model we create new instances 

    const user = new Data({
        firstName:"Muhammad Atif khan",
        email:"abc@123",
        age:20
    })

    // we also know here that user.save will return a promise so we need to handle it
try{
    await  user.save()
   

    res.send('User Login successfully')
}
catch(err){
res.status(500).send('Your Data is against Schema')
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


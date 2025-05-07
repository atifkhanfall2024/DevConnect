const express = require('express')
const ConnectDb =  require('./config/Db')
const Data = require('./models/user')

const app = express()

// here we need a middle ware to reading the json data 

app.use(express.json())

// suppose i need to login in a websites

app.post('/login' , async(req,res)=>{

    // handling dynamic api 


    // with model we create new instances 

    const user = new Data(req.body) 

    // we also know here that user.save will return a promise so we need to handle it
try{
    await  user.save()
   

    res.send('User Login successfully')
}
catch(err){
res.status(500).send('Your Data is against Schema')
}
  
})

// supoose i check a specific user by email

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

ConnectDb().then(()=>{
    console.log('Connection is success');
    app.listen(3000 , ()=>{
        console.log('server is listening.........');
    })
}).catch((err)=>{
    console.log('Data base connection is not eastablished');
})


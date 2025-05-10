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
res.status(500).send('Your Data is against Schema' + err.message)
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


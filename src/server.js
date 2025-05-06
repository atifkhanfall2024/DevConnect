const express = require('express');
const { AuthAdmin ,userAuth , Auth } = require('./middlewares/Adminauth');

const app = express()
       app.use(express.json());

       // for dashboard

 app.use('/dashboard' ,userAuth ,Auth )

 // error handling 
 // i generate random error 
 /* app.use('/' , (err,req,res,next)=>{
    if(err){
      res.status(402).send('Something went wrong')
    }
 })  */
 app.get('/dashboard/auth' , (req,res)=>{
    // here i generating random error
    try{
       // throw new Error('wrftgghjk')
        res.send('Welcome to Dashboard')
    }
    catch(err){
        res.status(500).send('Something went wrong please contact with our team ')
    }
    
 })
 app.get('/dashboard/user' , (req,res)=>{
    res.send('Welcome to Dashboard of user ')
 })
 

  app.get('/admin/getdata' ,AuthAdmin ,(req,res)=>{
    
    res.send('Data send successfully')
  })
  app.get('/admin/update' ,AuthAdmin, (req,res)=>{
    res.send('update the data')
  })
        
   
app.listen(5000 , ()=>{
    console.log("server is starting.....");
})

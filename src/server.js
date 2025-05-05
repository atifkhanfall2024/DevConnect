const express = require('express');
const { AuthAdmin ,userAuth , Auth } = require('./middlewares/Adminauth');

const app = express()
       app.use(express.json());

       // for dashboard

 app.use('/dashboard' ,userAuth ,Auth )

 app.get('/dashboard/auth' , (req,res)=>{
    res.send('Welcome to Dashboard')
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

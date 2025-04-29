const express = require('express')

const app = express()
       app.use(express.json());

       // dynaimc routing
       // getting by query 
    app.get("/users" , (req,res)=>{
        res.send(req.query)
    })  

    app.post("/users/:id/:name/:email" , (req,res)=>{
        console.log(req.params);
        res.send('Data push successfully to database')
    })


     app.get('/' , (req , res)=>{
        res.send("Hello from dashboard")
     })
     app.get("/Admin" , (req , res)=>{
        res.send('Hello from Admin')
       // console.log(req.url);
     })

    app.get('/user' , (req,res)=>{
        res.send({
            'name':"Muhammad Atif khan",
            "email":'abc@gmail.com'
        })
    })

  
   

app.post("/home" , (req ,res)=>{
    console.log(req.body);
    res.send(req.body)
})


app.listen(5000 , ()=>{
    console.log("server is starting.....");
})

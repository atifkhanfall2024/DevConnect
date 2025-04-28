const express = require('express')

const app = express()
app.use(express.json());
app.post("/home" , (req ,res)=>{
    console.log(req.body);
    res.send('data post successfully')
})


app.listen(5000 , ()=>{
    console.log("server is starting.....");
})

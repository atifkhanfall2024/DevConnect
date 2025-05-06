const express = require('express')
const ConnectDb =  require('./config/Db')

const app = express()

ConnectDb().then(()=>{
    console.log('Connection is success');
    app.listen(3000 , ()=>{
        console.log('server is listening.........');
    })
}).catch((err)=>{
    console.log('Data base connection is not eastablished');
})


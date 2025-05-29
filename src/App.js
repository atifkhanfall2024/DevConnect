const express = require('express')
const ConnectDb =  require('./config/Db')
const Data = require('./models/user')
const cook = require('cookie-parser')
const Auth = require('./routers/AuthRoute')
const ProfileRoute = require('./routers/ProfileRouter')
const ConnectionReq = require('./routers/ConnectionRoute')
const UserRouter = require('./routers/UserRouter')
require('dotenv').config(); 
const app = express()
app.use(express.json())
app.use(cook())
app.use('/',Auth)
app.use('/' , ProfileRoute)
app.use('/', ConnectionReq)
app.use('/' , UserRouter)



ConnectDb().then(()=>{
    console.log('Connection is success');
    app.listen(3000 , ()=>{
        console.log('server is listening.........');
    })
}).catch((err)=>{
    console.log('Data base connection is not eastablished');
})



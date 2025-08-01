const Mongoose = require('mongoose')
require('dotenv').config(); 



  //  console.log(Passward);
// we already know that mongoose will return us a promise so we need to handle it properly
const ConnectDb = async()=>{
    await Mongoose.connect(process.env.Connection_string)
}

module.exports = ConnectDb


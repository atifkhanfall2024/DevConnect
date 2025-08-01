const Mongoose = require('mongoose')
require('dotenv').config(); 

const Passward= process.env.passward

  //  console.log(Passward);
// we already know that mongoose will return us a promise so we need to handle it properly
const ConnectDb = async()=>{
    await Mongoose.connect(`mongodb://muhammadatifkhan:ukjJEVg58zUN3roM@atifnodejs-shard-00-00.zjo3x.mongodb.net:27017,atifnodejs-shard-00-01.zjo3x.mongodb.net:27017,atifnodejs-shard-00-02.zjo3x.mongodb.net:27017/DevConnect?ssl=true&replicaSet=atlas-10eloi-shard-0&authSource=admin&retryWrites=true&w=majority
`)
}

module.exports = ConnectDb


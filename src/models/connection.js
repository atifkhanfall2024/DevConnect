const mongoose = require('mongoose')

const ConnectionModel = new mongoose.Schema({

    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    recieverid:{
         type:mongoose.Schema.Types.ObjectId,
        required:true
    } ,

    status:{
        type:String,

        enum:{
            values:['accepted' , 'rejected' , 'interested' , 'ignore'],
        message:`{VALUE} is incorrect type`
        }
    }
} , {timestamps:true})

ConnectionModel.index({senderid:1 ,recieverid:1})

const Connect = new mongoose.model('Connection' , ConnectionModel)


module.exports = Connect
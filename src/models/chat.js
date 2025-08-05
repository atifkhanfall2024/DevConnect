const mongoose = require('mongoose')


// messages scehma

const Message = new mongoose.Schema({
    senderId:
    {
     type:mongoose.Schema.Types.ObjectId,
     ref:'User',
     required:true

    },
    text:{
        type:String,
        required:true
    }
} ,{timestamps:true})
const ChatSchema = new mongoose.Schema({
    participents:[
        {type:mongoose.Schema.Types.ObjectId , required:true , ref:'User'}
    ],

    messages:[Message]
})


const Chat = mongoose.model('Chat' , ChatSchema)

module.exports = {Chat}
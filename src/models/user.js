const Mongoose  = require('mongoose')

const userSchema = new Mongoose.Schema({
    firstName:{
        type:String
    },
    email:{
        type:String
    },
    age: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User' , userSchema)
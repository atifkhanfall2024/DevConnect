const Mongoose  = require('mongoose')

const userSchema = new Mongoose.Schema({
    firstName:{
        type:String ,
        required:true,
        trim:true,
        minlength:4,
        maxlength:30
    },
    email:{
        type:String,
        required:[true , 'Email is mandatory'],
        unique:true,
        lowercase:true,
        trim:true
    },
    age: {
  type: Number,
  required: true,
  min:18,
  max:60,
 
},
gender:{
type:String,
 // creating ourown custom function
  validate(value){
    if(!['boy' ,'men' , 'women'].includes(value)){
        throw new Error('Error occured please check it')
    }
  }
},
    createdAt: {
        type: Date,
        default: Date.now,
      required: [true, 'Age is required'],
    },
    photo:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScSmKFDsUAEqzwsdUpQPbl_sME6R_zQ0Zlxg&s'
    },
    about:{
        type:String,
        default:'What is in your mind ?'
    }
})

module.exports = Mongoose.model('User' , userSchema)
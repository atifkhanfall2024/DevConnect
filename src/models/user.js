const Mongoose  = require('mongoose')
const validator = require('validator')

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
        trim:true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Enter valid email "+value)
          }
        }
    },
    age: {
  type: Number,
  required: true,
  min:18,
  max:60,
  trim:true
 
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
  
    photo:{
        type:String,
        trim:true,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScSmKFDsUAEqzwsdUpQPbl_sME6R_zQ0Zlxg&s',
        validate(value){
          if(! validator.isURL(value)){
            throw new Error("URL is incorrect"+value)
          }
        }
    },
    about:{
        type:String,
        default:'What is in your mind ?',
        maxlength:200,
        minlength:10,
        trim:true
    },
    skills:{
      type:[String],
    validate(value){
       const length =  value.length <= 5;
       if(!length){
          throw new Error("Error you must enter 5 or less than 5 skills")
       }
    }
    }
},{timestamps:true})

module.exports = Mongoose.model('User' , userSchema)
const encrypted = require('bcrypt')

const IsValid = (req)=>{
     const {firstName} = req.body
    if(!firstName){
        throw new Error('Please enter valid name')
    }
}

const encrypt = async({passward})=>{
    const result = await encrypted.hash(passward , 10)
    return result
}

module.exports = {IsValid , encrypt}
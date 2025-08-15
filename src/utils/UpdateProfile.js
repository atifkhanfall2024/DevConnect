const ProfileEdit = async(req)=>{

    const IsUpdate = ['firstName' , 'age', 'photo'  , 'about' , 'skills' , 'gender'] 

    const Data = Object.keys(req.body).every(k=>IsUpdate.includes(k))
    
    if(!Data){
        throw new Error('Update Not Avalible')
    }
    return Data
}

module.exports = ProfileEdit
const socket = require('socket.io')
const {Chat} = require('../models/chat')
const Connection = require('../models/connection')

// securing our touserid and loginid that if some one also know about these ids then also he cannot be able to join the room

const crypto = require('crypto')


// secrue roomid

const SecureId = (loginuser , touserid)=>{

    return crypto.createHash('sha256').update([ loginuser , touserid].sort().join('$')).digest('hex')
}

const InitalizeSocket = (server)=>{

const io = socket(server , {
    cros:{
           origin:'http://localhost:5173',
    credentials:true,
    }
})

io.on('connection' , (socket)=>{
    socket.on('joinchat' , ({name ,loginuser , touserid})=>{

        const room = SecureId(loginuser , touserid)
        console.log(name , room);
        socket.join(room)
    })

    socket.on('sendmessage' , async({name , loginuser , touserid , text})=>{
      try{
           // check if these both or friend or not
        const Check = await Connection.findOne({senderid:loginuser , recieverid:touserid , status:'accepted'})
        if(!Check){
            throw new Error('Connection not found') }
     
        let chat = await Chat.findOne({
          participents: {$all:[loginuser , touserid]},
         })
        if(!chat){
            chat = new Chat({
            participents:[loginuser , touserid],
                messages:[]
            })
        }

        chat.messages.push({
            text,
            senderId:loginuser

        })

        await chat.save()
            const room = SecureId(loginuser , touserid)
         console.log(name  +  ' '  +  text);
         io.to(room).emit('recievemessage' , {name , text})
       
      }catch(err){
        console.log(err.message);
      }
    })

    socket.on('disconnect' , ()=>{})
})

}

module.exports = InitalizeSocket
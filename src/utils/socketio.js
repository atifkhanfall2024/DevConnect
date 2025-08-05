const socket = require('socket.io')

const InitalizeSocket = (server)=>{

const io = socket(server , {
    cros:{
           origin:'http://localhost:5173',
    credentials:true,
    }
})

io.on('connection' , (socket)=>{
    socket.on('joinchat' , ({name ,loginuser , touserid})=>{

        const room = [ loginuser , touserid].sort().join('_')
        console.log(name , room);
        socket.join(room)
    })

    socket.on('sendmessage' , ({name , loginuser , touserid , text})=>{
         const room = [loginuser , touserid].sort().join('_')
         console.log(name  +  ' '  +  text);
         io.to(room).emit('recievemessage' , {name , text})
    })

    socket.on('disconnect' , ()=>{})
})

}

module.exports = InitalizeSocket
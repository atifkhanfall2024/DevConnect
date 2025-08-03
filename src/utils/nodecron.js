const cron = require('node-cron')
const Connect = require('../models/connection')
const {subDays , endOfDay , startOfDay} = require('date-fns')
const Sendemail  = require('./sessendemail')

cron.schedule(' 17 6 * * * ' , async()=>{
  
    // first we check the connections that recieve and its status should be interested

    // first i set the connection that i got yesterday 
    // for that i install a best library of date

    const yesterday = subDays(new Date() , 2)
    //console.log(yesterday);
    const yesterdayend = endOfDay(yesterday)
   // console.log(yesterdayend);
    const yesterdaystart = startOfDay(yesterday)
   // console.log(yesterdaystart);

    const ConnectionRecieve = await Connect.find({
        status:'interested',
        
       createdAt:{
         $gt:yesterdaystart,
         $lt: yesterdayend
        }
    }).populate('recieverid')
   // console.log(ConnectionRecieve);

   // now only need emails of reciever but unique 

   const IsEmail = [...new Set(ConnectionRecieve.map((req)=>req.recieverid.email))]
   //console.log(IsEmail);

   // using loop to send to one by one email 
   for(const email of IsEmail){
    try{
        const SendEmail = await Sendemail.run('New Friend Request is Pending from  '  +   email   , ' You have too many connection Request . Please Check it . Accept or Reject it' )
    }catch(err){
        console.log(err.message);
    }
   }
})



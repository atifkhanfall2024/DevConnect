const express = require('express')
const app = express()
const payment = express.Router()
const {ValidateToken} = require('../middlewares/Adminauth')
const PaymentModel = require('../models/payment')
require('dotenv').config()

const Stripe = require('stripe')

const stripe = new Stripe(process.env.Secret_Key); 

app.use(express.json())

payment.post('/payment/createId' , ValidateToken , async(req,res)=>{
    try{

        const user = req.user._id
  const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Silver Membership",
            },
            unit_amount: 999, // amount in cents (999 = $9.99)
          },
          quantity: 1,
        },
      ],
        success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });

    // save data into database

    const Createorder = await PaymentModel({
          user ,
          sessionId:session.id,
            amount: 999,
             productName: "Silver Membership",
              status: session.payment_status,
    })


  const Saved =   await Createorder.save()

    // to retrun information to frontend

     res.json({ ...Saved.toObject()  })
    // 3. Send the session ID back to frontend
  //  res.json({ sessionId: session.id, url: session.url });
    }catch(err){
        res.status(401).json({message:err.message})
    }
})

module.exports = payment
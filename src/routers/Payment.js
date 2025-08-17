const express = require('express')
const app = express()
const payment = express.Router()
const {ValidateToken} = require('../middlewares/Adminauth')
const PaymentModel = require('../models/payment')
require('dotenv').config()
const MemeberShipedata = require('../utils/constant')

const Stripe = require('stripe')
const { find } = require('../models/user')
const user = require('../models/user')

const stripe = new Stripe(process.env.Secret_Key); 

app.use(express.json())

payment.post('/payment/createId' , ValidateToken , async(req,res)=>{
    try{

          const {MemberShip} = req.body
          const {firstName , email} = req.user

        const user = req.user._id
  const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: MemberShip,
              description: `Membership for ${firstName} (${email})`
            },
   
            unit_amount: MemeberShipedata[MemberShip]*100, // amount in cents (999 = $9.99)
          },
          quantity: 1,
        },
      ],
        success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    // save data into database

    const Createorder = await PaymentModel({
          user ,
          sessionId:session.id,
            amount: MemeberShipedata[MemberShip]*100,
             productName:MemberShip,
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


// now making other api of webhook to verify payment

payment.post('/payment/webhook' , async(req,res)=>{
  try{
       const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.Webhook_secret;

  let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("Verified Event:", event.type);

    if(!event){
     return res.status(401).send('Web hook Signature Verification Failed')
    }
    if (event.type === "checkout.session.completed") {
    console.log(" Payment success:", event.data.object);
  }

  // now we want if verification success then change its status into paid or active

     const Paymentdetail = event.data.object

     // so this payment detail will give me a json file 
     /*
     {
  "data": {
    "object": {
      "id": "cs_test_a1b2c3",
      "object": "checkout.session",
      "payment_status": "paid",
      "amount_total": 5000,
      "currency": "usd",
      "customer_email": "user@example.com"
    }
  }
}

     */

// to find specific id in database

const findid = await PaymentModel.findOne({sessionId:Paymentdetail.id})

findid.status = Paymentdetail.payment_status
await findid.save()


// now also if i want that to show me that which member got premium and which type of membership so i also add it 

const userDocs = await user.findOne({_id:findid.user})

userDocs.isPremium = true
userDocs.Membershipss = findid.productName
await userDocs.save()


res.status(200).send('Webhook Success')

  }catch(err){
    res.status(400).send(err.message)
  }
})

module.exports = payment
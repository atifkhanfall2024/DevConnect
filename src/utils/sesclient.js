//Purpose:
//sesClient.js is a helper function that creates an Amazon Simple Email Services (Amazon SES) service client.

//*/
// snippet-start:[ses.JavaScript.createclientv3]
const { SESClient } = require("@aws-sdk/client-ses");
require("dotenv").config();

// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION , credentials:{
     accessKeyId : process.env.Access_key ,
    secretAccessKey:process.env.SecretAccess_key
} });
module.exports  = { sesClient };
// snippet-end:[ses.JavaScript.createclientv3]
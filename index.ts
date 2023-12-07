

//first typescipt program 
//uses rapid api to get curremt btc address, and sends an email with this info.

import fs from "fs";
import axios from 'axios';
import * as nodemailer from 'nodemailer';

require("dotenv").config(); //allows env data to be accessed 




const url: string = "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price";

let config = {   //this is the config object, which I will give it more information like headers to include in the request, 

  headers:{

    'X-RapidAPI-Key': process.env.API_KEY,

    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
 
  }


}

try {
  axios.get(url, config).then(response =>{                    //remember you can do multiple operatoins after the arrow, since its its own little function
    
    let price: number = parseFloat(response.data.data.price);

    let priceRounded: number = Math.round(price * 100) / 100;
     

    const priceEmail: string = ("Todays BTC Price is: $" + priceRounded);            //in this case I am creating a variable that stores just the price section of the response so i can use the variable latrer.

    sendEmail(priceEmail);
  
  }) ;


}
catch(error){
  console.error(error);
}



function sendEmail(price:string) {

  
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_NAME, // accesses .env file and grabs data
      pass: process.env.PASS_WORD  // accesses .env file and grabs data
    }
  });

  let mailOptions = {
    from: '"BTC Price Update" <primoishere987654321@gmail.com>', // sender address
    to: "uhprimo@gmail.com", // list of receivers
    subject: "Todays Crypto Prices", // Subject line
    text: price, // plain text body
    html: price // HTML body content

  };
  transporter.sendMail(mailOptions)
  .then(info => {
    console.log(`Email sent: ${info.response}`);
  })
  .catch(error => {
    console.error(`Error sending email: ${error}`);
  });
  
}











  



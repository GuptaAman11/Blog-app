const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()



module.exports = async(email,subject,text)=> {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port:Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth:{
                user: process.env.USERK,
                pass: process.env.PASS
            }
    });
   
    await transporter.sendMail({
        from: process.env.USERK,
        to: email,
        subject: subject,
        text: text
    });
    } catch(error) {
        console.log(error)
        console.log("Email not sent");
    }
}  


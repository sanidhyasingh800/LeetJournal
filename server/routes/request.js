import express from 'express'; // use the express server routing functionality
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';


const router = express.Router();
dotenv.config();

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );


router.post('/', async (req, res, next) => {
    console.log("request received1");
    res.header("Access-Control-Allow-Origin", "https://leetjournal.netlify.app/");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectUrl = "https://leetjournal-d16ba849c9e0.herokuapp.com/oauth";
    console.log("request received2");

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID, 
        process.env.CLIENT_SECRET, 
        redirectUrl
    );
    console.log("request received3");

    const authorizedUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
});

res.json({url: authorizedUrl});


});

export default router;

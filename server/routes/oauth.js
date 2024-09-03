import express, { response } from 'express'; // use the express server routing functionality
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';


const router = express.Router();
dotenv.config();


const getUserData = async (access_token) =>{
    const reponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log(data);
}   

router.get('/', async (req, res, next) => {
    const code = req.query.code;
    try{
        const redirectUrl = 'http://localhost:5000/oauth';

        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID, 
            process.env.CLIENT_SECRET,
            redirectUrl
        );

        const res = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('Tokens acquired');
        const user = oAuth2Client.credentials;
        console.log(user);
        await getUserData(user.access_token);
    } catch(error){
        console.log(error);
    }
})

export default router;
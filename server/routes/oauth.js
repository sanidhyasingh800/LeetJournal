import express from 'express'; // use the express server routing functionality
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch'; // make sure to install this dependency if not installed: npm install node-fetch

const router = express.Router();
dotenv.config();

// Helper function to get user data from Google
const getUserData = async (access_token) => {
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const data = await response.json();
        // console.log("User data from Google:", data); // Logging to backend terminal
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

router.get('/', async (req, res, next) => {
    const code = req.query.code;
    console.log("Received OAuth code:", code); // Check if the code is reaching the backend

    try {
        const redirectUrl = 'https://leetjournal-d16ba849c9e0.herokuapp.com/oauth'; // Frontend redirect URL after successful OAuth login

        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );

        // Exchange authorization code for tokens
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);


        // Fetch and log user data
       // const userData = await getUserData(tokens.access_token);
        // console.log('User Info: ', userData); // This should appear in the backend terminal

        const jwt = await oAuth2Client.verifyIdToken({idToken: tokens.id_token, audience: process.env.CLIENT_ID});
        
        // console.log(jwt.getPayload());

        const payload = jwt.getPayload();

        const user = {
            userid: payload['sub'], // Unique user ID
            email: payload['email'], // User's email
            name: payload['name'],    // User's name
            image: payload['picture']
        }

        // Log user info to backend terminal
        console.log('User Info: ', user);
        // console.log(user);
        // Redirect to frontend after logging user data
        res.redirect(`https://leetjournal.netlify.app/?userId=${user.userid}&name=${user.name}&prof=${user.image}`); // Redirect to frontend after successful login
    } catch (error) {
        console.error('Error during OAuth process:', error);
        res.status(500).send('OAuth failed');
    }
});

export default router;

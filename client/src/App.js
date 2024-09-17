import React, { useState, useEffect } from "react";
import { Container, Grow, Typography, Box, Button, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';

import Journal from "./components/Journal/journal.js";
import Form from './components/Form/Form';
import Table from './components/table/table';
import { StyledAppBar, MainContainer, Section } from './styles';
import { ThemeProvider } from '@mui/material/styles';

import { getQuestions } from './actions/questions';
import { darkTheme } from "./theme.js";
import ButtonAppBar from "./components/Title/titleCard.js";
import './index.css';

// import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'


const navigate = (url) => {
  window.location.href = url;
}

const auth = async () => {
  const response = await fetch('https://leetjournal-d16ba849c9e0.herokuapp.com/request', {method: 'POST'});
  const data = await response.json();
  navigate(data.url);
  const userId = data.userid;
  

}



const authToMyAcc = () => {
  // Manually set user data
  const userId = "100396715511587280746";
  const userName = "Sanidhya Singh";
  const userImage = "https://lh3.googleusercontent.com/a/ACg8ocIu6CfRuxKihysS840nQXBHe9XAEvzn5-JW0f1wSzTRfCShl-LeYg=s96-c";

  // Simulate a query parameter to the URL
  const url = `https://leetjournal.netlify.app/?userId=${userId}&name=${encodeURIComponent(userName)}&prof=${encodeURIComponent(userImage)}`;
  
  // Navigate to the new URL with user data
  navigate(url);
};



const App = () => {

  const [currentId, setCurrentId] = useState(null); // Manage current ID across components
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [myProg, setmyProg] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = queryParams.get('userId');
    const userNameFromUrl = queryParams.get('name');
    const userImageFromUrl = queryParams.get('prof');

    if (userIdFromUrl) {
      setUserId(userIdFromUrl);
      setUserName(userNameFromUrl);
      setUserImage(userImageFromUrl);
    }

    dispatch(getQuestions(userId));
  }, [dispatch, userId]);

  const handleSignIn = async () => {
    // could not get cors working so instead sending a static request to oauth
    setmyProg(false);
    await document.getElementById('oauth-form').submit();
  };

  return ( 
  <>
  {!userId ? (
        <Container maxWidth="xs" style={{ textAlign: 'center', marginTop: '20vh' }}>
          <Typography variant="h4" gutterBottom>Welcome to LeetJournal</Typography>
          <Typography variant="body1" gutterBottom>Sign in with your Google account to continue</Typography>
          <form
            id="oauth-form"
            action="https://leetjournal-d16ba849c9e0.herokuapp.com/request"
            method="post"
            style={{ display: 'none' }}
          >
            <input type="submit" value="Press to log in" />
       </form>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => { handleSignIn()}}
            style={{ backgroundColor: '#4285F4', color: '#fff', padding: '10px 20px', marginTop: '20px' }}
          >
            Sign in with Google
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {setmyProg(true); authToMyAcc()}}
            style={{ backgroundColor: '#4285F4', color: '#fff', padding: '10px 20px', marginTop: '20px' }}
          >
            Or see my progress!
          </Button>
        </Container>
      ) : (<ThemeProvider theme={darkTheme}>
        <ButtonAppBar userId = {userId} setUserId = {setUserId} userName = {userName} userImage = {userImage}/>
      <Container maxWidth="xl" style={{ padding: "10px", minHeight: "100vh" }}>
    

        <Grow in>
          <Box display="flex" justifyContent="space-between" height="calc(100vh)" flexDirection={{ xs: "column", md: "row" }}>
            {/* Journal on the left */}
            <Box flex={{ xs: 12, md: 2 }} marginRight={0} display="flex" flexDirection="column">
              <Journal currentId={currentId} setCurrentId={setCurrentId} userId = {userId}/>
            </Box>
    
            {/* Table and Form */}
            <Box display="flex" flexDirection="column">
              {/* Form on the right */}
              <Box flex={{ xs: 12, md: 1 }} marginLeft={1} display="flex" flexDirection="column">
                <Form myProg={myProg} setmyProg={setmyProg} currentId={currentId} setCurrentId={setCurrentId} userId = {userId}/>
              </Box>
    
              {/* Table in the middle */}
              <Box flex={{ xs: 12, md: 3 }} marginX={0} marginY={1} display="flex" flexDirection="column" maxHeight="100vh">
                <Table currentId={currentId} setCurrentId={setCurrentId} userId = {userId}/>
              </Box>
            </Box>
          </Box>
        </Grow>
      </Container>
    </ThemeProvider>)
    
}
    </>
  );
}

export default App;



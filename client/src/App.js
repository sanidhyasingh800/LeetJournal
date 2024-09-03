import React, { useState, useEffect } from "react";
import { Container, Grow, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import Journal from "./components/Journal/journal.js";
import Form from './components/Form/Form';
import Table from './components/table/table';
import { StyledAppBar, MainContainer, Section } from './styles';
import { ThemeProvider } from '@mui/material/styles';

import { getQuestions } from './actions/questions';
import { darkTheme } from "./theme.js";
import './index.css';


// import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'


const navigate = (url) => {
  window.location.href = url;
}

const auth = async () => {
  const response = await fetch('http://localhost:5000/request', {method: 'post'});

  const data = await response.json();
  navigate(data.url);
}



const App = () => {

  const [currentId, setCurrentId] = useState(null); // Manage current ID across components
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getQuestions());
  }, [currentId, dispatch]);

  return (
    <>
    <h1>welcome</h1>
    <h3>google</h3>
    <button type= 'button' onClick = {() => auth()}>
      google sign in 
    </button> 
    </>
  );
}

export default App;



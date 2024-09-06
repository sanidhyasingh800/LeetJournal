import { createTheme, ThemeProvider } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { 
      default: '#1E1E2D',
      paper: '#252634',
    },
    primary: {
      main: '#3D5AFE',
    },
    secondary: {
      main: '#FF4081',
    },
    text: {
      primary: '#E0E0E3',
      secondary: '#A0A0A3',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 300,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: Array(25).fill('none').map((shadow, index) => `0 4px 20px rgba(0, 0, 0, ${index * 0.04})`),
});

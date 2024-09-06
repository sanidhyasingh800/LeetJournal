
import { styled } from '@mui/material/styles';
import { Paper, Button, TextField } from '@mui/material';

// Styled Root component
export const Root = styled('div')(({ theme }) => ({
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
  },
}));

// Styled Paper component
export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  alignItems: 'center'
}));

// Styled Form component
export const StyledForm = styled('form')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  flexDirection : "row"
});

// Styled File Input component
export const FileInput = styled('div')({
  width: '97%',
  margin: '10px 0',
});

// Styled Submit Button component
export const StyledButtonSubmit = styled(Button)({
  marginBottom: 10,
  backgroundColor: '#0000FF', // Blue background
  color: 'white',
  '&:hover': {
    backgroundColor: '#000099', // Darker blue on hover
  },
});

export const StyledButtonClear = styled(Button)({
  marginBottom: 10,
  backgroundColor: '#990000', // Blue background
  color: 'white',
  '&:hover': {
    backgroundColor: '#990000', // Darker blue on hover
  },
});
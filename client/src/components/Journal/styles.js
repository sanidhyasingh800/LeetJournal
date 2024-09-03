import { styled } from '@mui/material/styles';
import { Container, Box, Paper} from '@mui/material';

// Styled Container component
export const MainContainer = styled(Container)({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

// Styled Box component for small margin
export const SmMarginBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}));

// Styled div component for action div
export const ActionDiv = styled('div')({
  textAlign: 'center',
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    width: "100%"
  }));
import { TableRow, TableCell } from "@mui/material";
import { styled } from '@mui/material/styles';

// Styled component for table row with hover effect
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
      cursor: 'pointer',
    },
  }));
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: 'center', // Ensure the text is centered
    fontWeight: 'bold',  // Make the header text bold
    cursor: 'pointer',   // Indicate that the cell is clickable
    padding: theme.spacing(1), // Add padding for better spacing
    '&:hover': {
      backgroundColor: theme.palette.action.hover, // Add hover effect for visual feedback
    },
  }));
import { styled } from '@mui/material/styles'
import { AppBar } from '@mui/material';

// export default makeStyles(() => ({
//     appBar: {
//         borderRadius: 15,
//         margin: '30px 0',
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       heading: {
//         color: 'rgba(0,183,255, 1)',
//       },
//       image: {
//         marginLeft: '15px',
//       },
// }));


export const StyledAppBar = styled(AppBar)( ({ theme }) => ({
    borderRadius: 100,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
}));

// Styled Heading component
export const StyledHeading1 = styled('h1')({
    color: 'rgba(255,255,255, 1)',
    fontFamily: 'sans-serif',
  });
  
// Styled Image component
export const StyledImage = styled('img')({
    marginLeft: '15px',
});




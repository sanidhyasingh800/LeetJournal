// import React from "react";
// import {Button, Typography, CardContent} from '@mui/material';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import moment from 'moment';

// import { useDispatch } from 'react-redux';

// import { deletePost, likePost } from '../../../actions/questions.js';


// import { 
//     Media, 

//     StyledCard, 
//     Overlay, 
//     Overlay2, 
//     Details, 
//     Title, 
//     StyledCardActions 
//   } from './styles';


// const Post = ({ post, setCurrentId }) => {
//     const dispatch = useDispatch();
//     return (
//         <StyledCard>
//             <Overlay>
//                 <Typography variant = "h6">
//                     {post.creator}
//                 </Typography>
//                 <Typography variant = "body2">
//                     {moment(post.createdAt).fromNow()}
//                 </Typography>
//             </ Overlay>
//             <Overlay2>
//                     <Button style = {{color: 'white'}} size = 'small'
//                         onClick = {() => {
//                              setCurrentId(post._id)
//                         }}>
//                         <MoreHorizIcon fontSize  = 'default' />
//                     </Button>
//                 </Overlay2>
//                 <Details>
//                     <Typography variant = "body2" color = 'textSecondary'>
//                         {post.tags.map((tag) => `#${tag} `)}
//                     </Typography>
//                     </Details>
//                     <Title variant = 'h5' gutterBottom>
//                             {post.title}
//                         </Title>
//                     <CardContent>
//                         <Title variant = 'h5' component = 'p'>
//                             {post.message} 
//                         </Title>
//                     </CardContent>
//                     <StyledCardActions>
//                         <Button size = 'small' color = 'primary' onClick = {() => {dispatch(likePost(post._id))}}>
//                             <ThumbUpAltIcon fontSize = 'small' />
//                             Like: 
//                             {post.likeCount}
//                         </Button>
//                         <Button size = 'small' color = 'primary' onClick = {() => {dispatch(deletePost(post._id))}}>
//                             <DeleteIcon fontSize = 'small' />
//                             Delete
//                         </Button>
//                     </StyledCardActions>

//         </StyledCard>
//     );
// }

// export default Post;

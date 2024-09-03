import React from "react";
import {Grid, CircularProgress} from '@mui/material';
import { useSelector} from 'react-redux'; // allows us to grab data from our shared data storage within our shared state

import Post from './Post/Post';
import { MainContainer} from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from "../../actions/questions";

const Posts = ( { setCurrentId }) => {
    // const dispatch = useDispatch();
    // dispatch(getPosts());
    const posts = useSelector((state) => state.posts|| []);

    return (
        !posts.length ? <CircularProgress /> : (
            <MainContainer alignItems = 'stretch' spacing = {3}>
                {
                    posts.map((post) => (
                        <Grid key = {post._id} item  xs = {12} sm = {6}>
                            <Post post={post} setCurrentId = {setCurrentId} />
                        </Grid>
                    ))
                }
            </MainContainer>
        )
    );
}

export default Posts;
   
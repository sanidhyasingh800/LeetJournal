import React, { useState, useEffect } from "react";
import { StyledPaper, StyledForm, FileInput, StyledButtonClear, StyledButtonSubmit } from './styles';
import { TextField, Typography, MenuItem, InputLabel, FormControl, Box, Select } from '@mui/material';
import FileBase from 'react-file-base64'; // component that allows for file submissions, etc

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { useDispatch } from 'react-redux';
import { createQuestion, updateQuestion } from '../../actions/questions';

import { useSelector } from "react-redux";

const Form = ({ myProg, currentId, setCurrentId, userId}) => {

    const [questionData, setQuestionData] = useState({
        userId: userId,
        title: '',
        difficulty: '',
        status: '',
        tags: '',
    });

    const dispatch = useDispatch(); // this allows us to actually dispatch action to the redux wrapper

    // upon hitting the submit button, this action creator will be triggered
    // then it will dispatch an action to later be intercepted by a reducer (shared state changer)
    const handleSubmit = (e) => {
        e.preventDefault(); // prevents a refresh

        if (currentId) { // if we have currentID selected, then we turn the form into a post editor instead of post creator
            console.log("updateQuestion is Dispatched");
            dispatch(updateQuestion(userId, currentId, questionData));
        } else {
            dispatch(createQuestion(userId, questionData));
        }
        clear(); 
    }

    const clear = () => {
        setCurrentId(null);
        setQuestionData({
            userId: userId,
            title: '',
            difficulty: '',
            status: '',
            tags: '', 
        })
    }

    const selectedQuestion = useSelector((state) => {
        if (currentId) {
            const question = state.questions.find((question) => question._id === currentId);
            console.log(question);
            return question;
        } else {
            return null;
        }
    });

    useEffect(() => {
        if (selectedQuestion) setQuestionData(selectedQuestion);
    }, [selectedQuestion])


    return (

        <StyledPaper>
             <Typography variant="h6"> {currentId ? 'Edit' : "Submit"} A Question</Typography>

            <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit} alignItems = "top" >
                <TextField
                    name='Question'
                    variant='outlined'
                    label='question'
                    fullWidth
                    value={questionData.title}
                    onChange={(e) => setQuestionData({ ...questionData, title: e.target.value })}
                    style={{ margin: '5x 0', flexBasis: '45%' }}
                />
                <FormControl fullWidth margin='normal' style={{ margin: '10px 0', flexBasis: '15%' }}>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                        value={questionData.difficulty}
                        onChange={(e) => setQuestionData({ ...questionData, difficulty: e.target.value })}
                        label="Difficulty"
                    >
                        <MenuItem value="Easy">Easy</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Hard">Hard</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin='normal' style={{ margin: '5x 0', flexBasis: '15%' }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={questionData.status}
                        onChange={(e) => setQuestionData({ ...questionData, status: e.target.value })}
                        label="status"
                    >
                        <MenuItem value="Not Attempted">Not Attempted</MenuItem>
                        <MenuItem value="Attempted">Attempted</MenuItem>
                        <MenuItem value="Solved">Solved</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name='tags'
                    variant='outlined'
                    label='tags'
                    fullWidth
                    value={questionData.tags}
                    onChange={(e) => setQuestionData({ ...questionData, tags: e.target.value.split(',') })}
                    style={{ margin: '10px 0', flexBasis: '25%' }}
                />
                <StyledButtonSubmit disabled = {myProg} variant='container' color='primary =' size='large' type='submit'>
                    Submit
                </StyledButtonSubmit>
                <StyledButtonClear disabled = {myProg} variant='container' color='primary =' size='large' onClick={clear}>
                    clear
                </StyledButtonClear>
            </StyledForm>
        </StyledPaper>
    );
}

export default Form;

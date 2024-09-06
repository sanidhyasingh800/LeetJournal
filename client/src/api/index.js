import axios from 'axios';

// Base API endpoint
const url = 'https://leetjournal-d16ba849c9e0.herokuapp.com/questions';

// Function to get questions based on userId
export const getQuestions = (userId) => axios.get(`${url}/${userId}`);

// Function to create a new question with userId
export const createQuestion = (userId, newQuestion) => {
    return axios.post(`${url}/${userId}`, newQuestion);
}

// Function to update an existing question based on question id
export const updateQuestion = (userId, id, updatedQuestion) => axios.patch(`${url}/${userId}/${id}`, updatedQuestion);

// Function to delete a question based on question id
export const deleteQuestion = (userId, id) => axios.delete(`${url}/${userId}/${id}`);

// Function to update journal notes and code for a specific question
export const updateJournal = (userId, id, notes, code) => axios.patch(`${url}/${userId}/${id}/journal`, { notes, code });

import axios from 'axios'

// connecting the front and back ends 
// axios is a library that is used to send HTTP requests from the front end to the back end



// a url variable that stores the api endpoint that we have defined in our backend 

const url = 'http://localhost:5000/questions';

// exports an async function that that send a GET request to the posts endpoint
export const getQuestions = () => axios.get(url);

// exports an async function that that send a POST request to the posts endpoint
export const createQuestion = (newPost) => axios.post(url, newPost);

// exports an async function that that send a PATCH request to the posts endpoint
export const updateQuestion = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

// exports an async function that that send a PATCH request to the posts endpoint
export const deleteQuestion = (id) => axios.delete(`${url}/${id}`);

export const updateJournal = (id, notes, code) => axios.patch(`${url}/${id}/journal`, {notes, code});



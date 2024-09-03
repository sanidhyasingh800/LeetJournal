import express from 'express'; // use the express server routing functionality

import {getQuestions, createQuestion, updateQuestion, deleteQuestion, UpdateNotesAndCode} from '../controllers/question.js'; // import all controller route functions that we need
// defines all post related routes 

// our router object responsible for intercepting/handling post-related queries
const router = express.Router();


// http://localhost:5000/posts
// ^ this is the server side (back end) html site where we can monitor the result of our backend queries to the DB
// the first parameter represents the last prefix the router will match this function to
router.get('/', getQuestions);
router.post('/', createQuestion);
router.patch('/:id', updateQuestion); // the :id means that the url expects an actual id here (dynamic url token)
router.delete('/:id', deleteQuestion); // the :id means that the url expects an actual id here (dynamic url token)
router.patch('/:id/journal', UpdateNotesAndCode); // the :id means that the url expects an actual id here (dynamic url token)

export default router;
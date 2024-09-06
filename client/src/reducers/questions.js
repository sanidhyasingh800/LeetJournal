
import * as constants from '../constants/actionTypes.js';

// the action handler for all questions related updates
// since questions must be available globally,
// any update to questions means that we have to update the shared state

const reducer = (questions = [], action) => {
    switch(action.type){
        case constants.FETCH_ALL:
            return action.payload ? [...action.payload]: []; // returning in a reducer means updating the shared state
        case constants.CREATE:
            return [...questions, action.payload];
        case constants.UPDATE:
            return questions.map((questions) => {
                if(questions._id === action.payload._id){
                    return action.payload;
                } else {
                    return questions;
                }
            })
        case constants.DELETE:
            return questions.filter((questions) => questions._id !== action.payload);
        case constants.LIKE:
            return questions.map((questions) => {
                if(questions._id === action.payload._id){
                    return action.payload;
                } else {
                    return questions;
                }
            })
        case constants.SORT:
            return action.payload ? [...action.payload]: [];
        default:
            return questions;
    }

}

export default reducer;
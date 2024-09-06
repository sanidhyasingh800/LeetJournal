import * as api from '../api/index.js';
import * as constants from '../constants/actionTypes.js';



// Action creators
// functions that return actions
// these actions can then be used in our reducers to perform state updates
// any action that is working on backend/DB must be async using thunk, which is why we have to use 2 function wrappers in a weird syntax as below
export const getQuestions = (userId) => async (dispatch) => {
    console.log(userId);
    try {
        const { data } = await api.getQuestions(userId); // actual connection from back to front end
        // console.log('Fetched questions for user:', userId, data); // add this to check
        console.log(data);
        const action = {type: constants.FETCH_ALL, payload : data}; // set up the action object with type and fetched data
        // console.log("payload is empty");
        // console.log(data.map((question) => question.title)); // Log to ensure correct data
        dispatch(action); // dispatch (async return) the action back to the redux store so that shared state may be updated
        // the redux store will automatically forward to the correct reducer
        // because of this, the action type must be unique, so that the redux behavior is deterministic
    } catch (error) {
        console.log(error.message);
    }

}

export const createQuestion = (userId, question) => async (dispatch) => {
    try {
        const response = await api.createQuestion(userId, question);  // Ensure response is valid
        console.log("Response from backend:", response);  // Check if the response object exists
        const { data } = response; // Extract data after verifying response
        dispatch({type: constants.CREATE, payload :data}); // dispatching the action object (with type and payload) to the reducer so that we can use it to change the shared state
    } catch (error) {
        console.log(error);
    }
}


export const updateQuestion = (userId, id, question) => async (dispatch) => {
    try {
        const { data } = await api.updateQuestion(userId,id, question); // our back end call

        dispatch({type: constants.UPDATE, payload :data}); // dispatching the action object (with type and payload) to the reducer so that we can use it to change the shared state
    } catch (error) {
        console.log(error);
    }
}


export const deleteQuestion = (userId, id) => async (dispatch) => {
    try {
        await api.deleteQuestion(userId, id); // our back end call

        dispatch({type: constants.DELETE, payload : id }); // dispatching the action object (with type and payload) to the reducer so that we can use it to change the shared state
    } catch (error) {
        console.log(error);
    } 
}

export const sortQuestions = (userId, sortedQuestions) => (dispatch) => {
    dispatch({type: constants.SORT, payload: sortedQuestions})

}


export const updateJournal = (userId, id, notes, code) => async (dispatch) => {
    try {
        const { data } = await api.updateJournal(userId, id, notes, code); // our back end call

        dispatch({type: constants.UPDATE, payload : data }); // dispatching the action object (with type and payload) to the reducer so that we can use it to change the shared state
    } catch (error) {
        console.log(error);
    }
}

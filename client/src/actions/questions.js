import * as api from '../api/index.js';
import * as constants from '../constants/actionTypes.js';



// Action creators
// functions that return actions
// these actions can then be used in our reducers to perform state updates
// any action that is working on backend/DB must be async using thunk, which is why we have to use 2 function wrappers in a weird syntax as below
export const getQuestions = () => async (dispatch) => {

    try {
        const { data } = await api.getQuestions(); // actual connection from back to front end
        const action = {type: constants.FETCH_ALL, payload : data}; // set up the action object with type and fetched data
        console.log("payload is empty");
        console.log(data.map((question) => question.title)); // Log to ensure correct data
        dispatch(action); // dispatch (async return) the action back to the redux store so that shared state may be updated
        // the redux store will automatically forward to the correct reducer
        // because of this, the action type must be unique, so that the redux behavior is deterministic
    } catch (error) {
        console.log(error.message);
    }

}

export const createQuestion = (question) => async (dispatch) => {
    try {
        const { data } = await api.createQuestion(question); // our back end call
        console.log("api call dispatched");
        dispatch({type: constants.CREATE, payload :data}); // dispatching the action object (with type and payload) to the reducer so that we can use it to change the shared state
    } catch (error) {
        console.log(error);
    }
}


export const updateQuestion = (id, question) => async (dispatch) => {
    try {
        const { data } = await api.updateQuestion(id, question); // our back end call

        dispatch({type: constants.UPDATE, payload :data}); // dispatching the action object (with type and payload) to the reducer so that we can use it to change the shared state
    } catch (error) {
        console.log(error);
    }
}


export const deleteQuestion = (id) => async (dispatch) => {
    try {
        await api.deleteQuestion(id); // our back end call

        dispatch({type: constants.DELETE, payload : id }); // dispatching the action object (with type and payload) to the reducer so that we can use it to change the shared state
    } catch (error) {
        console.log(error);
    }
}

export const sortQuestions = (sortedQuestions) => (dispatch) => {
    dispatch({type: constants.SORT, payload: sortedQuestions})

}


export const updateJournal = (id, notes, code) => async (dispatch) => {
    try {
        const { data } = await api.updateJournal(id, notes, code); // our back end call

        dispatch({type: constants.UPDATE, payload : data }); // dispatching the action object (with type and payload) to the reducer so that we can use it to change the shared state
    } catch (error) {
        console.log(error);
    }
}

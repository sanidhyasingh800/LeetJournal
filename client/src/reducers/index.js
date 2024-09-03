import { combineReducers } from 'redux';

import questions from "./questions";

// combines all reducer (state changer functions) into a single master combined reducer
// so far, only post actions change the global shared date (list of posts) so we only have post reducer

export default combineReducers({
    questions
});
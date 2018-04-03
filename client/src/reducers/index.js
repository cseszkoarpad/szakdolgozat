import {combineReducers} from 'redux';
import authReducer from './authReducer';
import autosReducer from './autosReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
    auth: authReducer,
    autos: autosReducer,
    comments: commentsReducer
});

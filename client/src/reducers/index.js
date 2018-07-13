import {combineReducers} from 'redux';
import auth from './authReducer';
import autos from './autosReducer';
import comments from './commentsReducer';

export default combineReducers({
  auth,
  autos,
  comments
});

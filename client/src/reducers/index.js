import {combineReducers} from 'redux';
import auth from './authReducer';
import cars from './carsReducer';
import comments from './commentsReducer';

export default combineReducers({
  auth,
  cars,
  comments
});

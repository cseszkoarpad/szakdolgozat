import { combineReducers } from 'redux';
import authReducer from './authReducer';
import autosReducer from './autosReducer';

export default combineReducers({
  auth: authReducer,
  autos: autosReducer
});

import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import autosReducer from './autosReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  autos: autosReducer,
});

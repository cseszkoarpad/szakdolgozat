import {ADD_CREDIT, FETCH_USER, SET_AUTH_TO_NULL, SET_IS_CAR_FROM_USER} from '../constants';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({type: FETCH_USER, payload: res.data});
};

export const setAuthToNull = () => async dispatch => {
  dispatch({type: SET_AUTH_TO_NULL});
};

export const handleToken = token => async dispatch => {
  axios.post('/api/stripe', token)
  .then(() => {
    dispatch({type: ADD_CREDIT});
  })
  .catch(error => console.error(error));
};

export const isCarFromUser = (carId, userId) => async dispatch => {
  const res = await axios.post('/api/isCarFromUser', {carId, userId});

  dispatch({type: SET_IS_CAR_FROM_USER, payload: res.data.isCarFromUser});
};
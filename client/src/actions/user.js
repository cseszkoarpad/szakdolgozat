import {FETCH_USER, SET_AUTH_TO_NULL} from '../constants';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({type: FETCH_USER, payload: res.data});
};

export const setAuthToNull = () => async dispatch => {
  dispatch({type: SET_AUTH_TO_NULL});
};
import {FETCH_AUTOS, ADD_AUTO, UPDATE_AUTO, DELETE_AUTO} from '../constants';
import axios from 'axios';

export const fetchAutos = () => async dispatch => {
  const res = await axios.get('/api/autos');

  dispatch({type: FETCH_AUTOS, payload: res.data});
};

export const addAuto = (auto) => async dispatch => {
  const res = await axios.post('/api/autos', {auto});

  dispatch({type: ADD_AUTO, payload: res.data});
};

export const updateAuto = (auto) => async dispatch => {
  const res = await axios.put('/api/autos/edit', {auto});

  dispatch({type: UPDATE_AUTO, payload: res.data});
};

export const deleteAuto = (id) => async dispatch => {
  const res = await axios.delete('/api/autos/delete', id);
  console.log(res);
  dispatch({type: DELETE_AUTO, id});
};

//TO TEST
export const incrementLikes = (autoId, userId) => async dispatch => {
  const res = await axios.patch('/api/autos/likes', {autoId, userId});

  dispatch({type: INCREMENT_LIKES, meta: {autoId, userId}});
};
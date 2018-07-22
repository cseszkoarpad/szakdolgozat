import {FETCH_CARS, ADD_CAR, UPDATE_CAR, DELETE_CAR, INCREMENT_LIKES, SEARCH_CARS} from '../constants';
import axios from 'axios';

export const fetchCars = () => async dispatch => {
  const res = await axios.get('/api/cars');

  dispatch({type: FETCH_CARS, payload: res.data});
};

export const search = (data) => async dispatch => {
  const res = await axios.get('/api/cars/search', data);

  dispatch({type: SEARCH_CARS, payload: res.data});
};

export const addCar = (car) => async dispatch => {
  const res = await axios.post('/api/cars', {car});

  dispatch({type: ADD_CAR, payload: res.data});
};

export const updateCar = (car) => async dispatch => {
  const res = await axios.put('/api/cars/edit', {car});

  dispatch({type: UPDATE_CAR, payload: res.data});
};

export const deleteCar = (id) => async dispatch => {
  const res = await axios.delete(`/api/cars/${id}`);
  dispatch({type: DELETE_CAR, id});
};

//TO TEST
export const incrementLikes = (carId, userId) => async dispatch => {
  await axios.patch('/api/cars/likes', {carId, userId});

  dispatch({type: INCREMENT_LIKES, payload: carId});
};
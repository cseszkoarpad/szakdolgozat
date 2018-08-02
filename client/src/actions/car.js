import {ADD_CAR, FETCH_CAR_BY_ID, FETCH_CARS, SEARCH_CARS, UPDATE_CAR} from '../constants';
import axios from 'axios';

export const fetchCars = () => async dispatch => {
  const res = await axios.get('/api/cars');

  dispatch({type: FETCH_CARS, payload: res.data});
};

export const fetchCarById = (id) => async dispatch => {
  const res = await axios.get(`/api/cars/${id}`);

  dispatch({type: FETCH_CAR_BY_ID, payload: res.data});
};

export const searchCars = (data) => async dispatch => {
  const res = await axios.post('/api/cars/search', {data});

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

export const deleteCar = (carId, userId) => async dispatch => {
  await axios.delete(`/api/cars/delete/${carId}/${userId}`);
};
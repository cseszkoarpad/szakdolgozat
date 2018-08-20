import {
  CLOUD_NAME,
  FETCH_CAR_BY_ID,
  FETCH_CAR_IMAGES_BY_ID,
  FETCH_CARS,
  GET_LIKES_COUNT,
  INCREMENT_LIKES,
  SEARCH_CARS,
  UPDATE_CAR,
} from '../constants';
import axios from 'axios';

export const fetchCars = () => async dispatch => {
  const res = await axios.get('/api/cars');

  dispatch({type: FETCH_CARS, payload: res.data});
};

export const fetchCarById = (id) => async dispatch => {
  const res = await axios.get(`/api/cars/${id}`);

  dispatch({type: FETCH_CAR_BY_ID, payload: res.data});
};

export const fetchCarImagesById = (carId) => async dispatch => {
  const res = await axios.get(`/api/cars/${carId}/images`);

  dispatch({type: FETCH_CAR_IMAGES_BY_ID, payload: res.data});
};

export const searchCars = (data) => async dispatch => {
  const res = await axios.post('/api/cars/search', {data});

  dispatch({type: SEARCH_CARS, payload: res.data});
};

export const addCar = (car) => async dispatch => {
  await axios.post('/api/cars', {car});
};

export const updateCar = (car) => async dispatch => {
  const res = await axios.put('/api/cars/edit', {car});

  dispatch({type: UPDATE_CAR, payload: res.data});
};

export const getLikesCount = (carId) => async dispatch => {
  const res = await axios.get(`/api/car/${carId}/likes`);

  dispatch({type: GET_LIKES_COUNT, payload: res.data.likes});
};

export const incrementLikes = (carId) => async dispatch => {
  const res = await axios.put('/api/car/like', {carId});

  dispatch({type: INCREMENT_LIKES, payload: res.data});
};

export const deleteCar = (carId, userId) => async dispatch => {
  await axios.delete(`/api/cars/delete/${carId}/${userId}`);
};

export const uploadCarImage = (image, carId) => async dispatch => {
  const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, image);
  const data = {
    url: res.data.secure_url,
    carId,
  };

  await axios.post(`/api/cars/images`, {data});
};
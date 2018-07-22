import {SUBMIT_COMMENT, FETCH_COMMENTS} from '../constants';
import axios from 'axios';

export const fetchComments = () => async dispatch => {
  const res = await axios.get('/api/comments');

  dispatch({type: FETCH_COMMENTS, payload: res.data});
};

export const submitComment = (userId, carId, userName, userText) => async dispatch => {
  const data = {userId,
    carId,
    userName,
    userText
  }
  console.log(data)
  const res = await axios.post('/api/cars/comments', data);
  console.log(res.data)
  dispatch({type: SUBMIT_COMMENT, payload: res.data});
};

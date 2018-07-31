import {SUBMIT_COMMENT, FETCH_COMMENTS} from '../constants';
import axios from 'axios';

export const fetchComments = (carId) => async dispatch => {
  const res = await axios.get(`/api/comments/${carId}`);

  dispatch({type: FETCH_COMMENTS, payload: res.data});
};

export const submitComment = (userId, carId, userText, name, profilePic) => async dispatch => {
  const data = {
    userId,
    carId,
    userText,
    name,
    profilePic,
  };
  const res = await axios.post('/api/comments', {data});
  dispatch({type: SUBMIT_COMMENT, payload: res.data});
};

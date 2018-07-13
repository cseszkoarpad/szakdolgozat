import {FETCH_AUTOS, FETCH_COMMENTS} from '../constants';
import axios from 'axios';

export const fetchComments = () => async dispatch => {
  const res = await axios.get('/api/comments');

  dispatch({type: FETCH_COMMENTS, payload: res.data});
};

export const submitComment = (userId, autoId, userName, userText) => async dispatch => {
  await axios.post('/api/autos/comments',
    {
      userId: userId,
      autoId: autoId,
      userName: userName,
      userText: userText
    });

  const res = await axios.get('/api/autos');
  dispatch({type: FETCH_AUTOS, payload: res.data});
};

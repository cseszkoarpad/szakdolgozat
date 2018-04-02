import {FETCH_USER, FETCH_AUTOS} from './types'
import axios from 'axios'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')

    dispatch({type: FETCH_USER, payload: res.data})
}

export const fetchAutos = () => async dispatch => {
    const res = await axios.get('/api/autos')

    dispatch({type: FETCH_AUTOS, payload: res.data})
}

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({type: FETCH_USER, payload: res.data});
};

//érdemes tesztelni
export const submitComment = (userId, autoId, userName, userText) => async dispatch => {
    const res = await axios.post('/api/autos/comments',
        {
            userId: userId,
            autoId: autoId,
            userName: userName,
            userText: userText
        })

    dispatch({type: FETCH_AUTOS, payload: res.data})
}


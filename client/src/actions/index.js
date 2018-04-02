import { FETCH_USER, FETCH_AUTOS } from './types'
import axios from 'axios'

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user')

	dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchAutos = () => async dispatch => {
	const res = await axios.get('/api/autos')

	dispatch({ type: FETCH_AUTOS, payload: res.data })
}

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

//érdemes tesztelni
export const submitComment = comment => async dispatch => {
	const res = await axios.post('/api/autos/:id/comments', comment)

	dispatch({ type: FETCH_AUTOS, payload: res.data })
}

export const submitAuto = (auto) => async dispatch => {
	const res = await axios.post('/api/autos', auto)

	dispatch({ type: FETCH_AUTOS, payload: res.data })
}


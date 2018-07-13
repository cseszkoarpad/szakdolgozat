import {FETCH_AUTOS} from '../constants'
import axios from 'axios'

export const fetchAutos = () => async dispatch => {
  const res = await axios.get('/api/autos')

  dispatch({type: FETCH_AUTOS, payload: res.data})
}
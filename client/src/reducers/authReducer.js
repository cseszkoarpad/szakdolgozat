import {DELETE_USER, FETCH_USER, SET_AUTH_TO_NULL, UPDATE_USER} from '../constants';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case UPDATE_USER:
      return action.payload;
    case SET_AUTH_TO_NULL:
      return false;
    case DELETE_USER:
      console.log(action.payload)
      return action.payload.success ? false : {...state}
    default:
      return state;
  }
}

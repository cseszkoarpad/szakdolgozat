import {FETCH_USER, SET_AUTH_TO_NULL} from '../constants';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case SET_AUTH_TO_NULL:
      return false;
    default:
      return state;
  }
}

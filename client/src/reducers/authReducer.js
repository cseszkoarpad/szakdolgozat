import {ADD_CREDIT, FETCH_USER, SET_AUTH_TO_NULL} from '../constants';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case ADD_CREDIT:
      return {
        ...state,
        credits: state.credits + 1,
      };
    case SET_AUTH_TO_NULL:
      return false;
    default:
      return state;
  }
}

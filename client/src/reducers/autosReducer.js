import {FETCH_AUTOS} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_AUTOS:
      return action.payload;
    default:
      return state;
  }
}

import {FETCH_COMMENTS} from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    default:
      return state;
  }
}

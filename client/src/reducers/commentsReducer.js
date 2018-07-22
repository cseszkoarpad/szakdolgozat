import {FETCH_COMMENTS, SUBMIT_COMMENT} from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    case SUBMIT_COMMENT:
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}

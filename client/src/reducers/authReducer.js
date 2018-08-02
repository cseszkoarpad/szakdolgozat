import {ADD_CREDIT, FETCH_USER, SET_AUTH_TO_NULL, SET_IS_CAR_FROM_USER} from '../constants';

const INIT_STATE = {
  isCarFromUser: false,
};

export default function (state = INIT_STATE, action) {
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
    case SET_IS_CAR_FROM_USER:
      return {
        ...state,
        isCarFromUser: action.payload,
      };
    default:
      return state;
  }
}

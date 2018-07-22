import {ADD_AUTO, DELETE_AUTO, FETCH_AUTOS, SEARCH_AUTOS, UPDATE_AUTO} from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_AUTOS:
      return action.payload;
    case SEARCH_AUTOS:
      return action.payload;
    case ADD_AUTO:
      return [
        ...state,
        action.payload
      ];
    case UPDATE_AUTO:
      const updatedAutoIndex = state.findIndex(auto => auto._id === action.payload.id);
      return [
        ...state.slice(0, updatedAutoIndex),
        action.payload,
        ...state.slice(updatedAutoIndex + 1)
      ];
    case DELETE_AUTO:
      return state.filter(auto => auto._id !== action.id);
    default:
      return state;
  }
}

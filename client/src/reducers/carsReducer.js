import {ADD_CAR, DELETE_CAR, FETCH_CARS, SEARCH_CARS, UPDATE_CAR} from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CARS:
      return action.payload;
    case SEARCH_CARS:
      return action.payload;
    case ADD_CAR:
      return [
        ...state,
        action.payload
      ];
    case UPDATE_CAR:
      const updatedCarIndex = state.findIndex(car => car._id === action.payload.id);
      return [
        ...state.slice(0, updatedCarIndex),
        action.payload,
        ...state.slice(updatedCarIndex + 1)
      ];
    case DELETE_CAR:
      return state.filter(car => car._id !== action.id);
    default:
      return state;
  }
}

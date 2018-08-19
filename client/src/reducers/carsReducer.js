import {
  ADD_CAR,
  FETCH_CAR_BY_ID, FETCH_CAR_IMAGES_BY_ID,
  FETCH_CARS,
  GET_LIKES_COUNT,
  INCREMENT_LIKES,
  SEARCH_CARS,
  UPDATE_CAR,
} from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CARS:
      return action.payload;
    case FETCH_CAR_BY_ID:
      return action.payload;
    case FETCH_CAR_IMAGES_BY_ID:
      return {
        ...state,
        images: [
          ...action.payload,
        ],
      };
    case SEARCH_CARS:
      return action.payload;
    case ADD_CAR:
      return [
        ...state,
        action.payload,
      ];
    case UPDATE_CAR:
      const updatedCarIndex = state.findIndex(car => car.id === action.payload.id);
      return [
        ...state.slice(0, updatedCarIndex),
        action.payload,
        ...state.slice(updatedCarIndex + 1),
      ];
    case INCREMENT_LIKES:
      if (action.payload.error) return {...state};
      return {
        ...state,
        likes: state.likes + 1,
      };
    case GET_LIKES_COUNT:
      return {
        ...state,
        likes: action.payload,
      };
    default:
      return state;
  }
}

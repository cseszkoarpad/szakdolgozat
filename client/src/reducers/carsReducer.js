import {
  ADD_CAR,
  FETCH_CAR_BY_ID, FETCH_CAR_IMAGES_BY_ID,
  FETCH_CARS, FETCH_CARS_FROM_USER,
  GET_LIKES_COUNT,
  INCREMENT_LIKES,
  SEARCH,
  UPDATE_CAR,
} from '../constants';

const INITIAL_STATE = {
  data: null,
  search: {},
  allCar: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CARS:
      return {
        ...state,
        allCar: [
          ...action.payload,
        ],
      };
    case FETCH_CAR_BY_ID:
      return {
        ...state,
        data: {
          ...action.payload,
        },
      };
    case FETCH_CARS_FROM_USER:
      return {
        ...state,
        data: [
          ...action.payload,
        ],
      };
    case FETCH_CAR_IMAGES_BY_ID:
      return {
        ...state,
        data: {
          ...state.data,
          images: [
            ...action.payload,
          ],
        },
      };
    case SEARCH:
      const {marka, kivitel, uzemanyag} = action.payload;
      return {
        ...state,
        search: {
          ...action.payload,
        },
        data: state.allCar.length && state.allCar.filter(car =>
          (((marka && car.marka === marka) || !marka) && ((kivitel && car.kivitel === kivitel) || !kivitel)
            && ((uzemanyag && car.uzemanyag === uzemanyag) || !uzemanyag)),
        ),
      };
    case ADD_CAR:
      return {
        ...state,
        allCar: [
          ...state.allCar,
          action.payload,
        ],
      };
    case UPDATE_CAR:
      const updatedCarIndex = state.allCar.findIndex(car => car.id === action.payload.id);
      return {
        ...state,
        allCar: [
          ...state.allCar.slice(0, updatedCarIndex),
          action.payload,
          ...state.allCar.slice(updatedCarIndex + 1),
        ],
      };
    case INCREMENT_LIKES:
      if (action.payload.error) return {...state};
      return {
        ...state,
        data: {
          ...state.data,
          likes: state.data.likes + 1,
        },
      };
    case GET_LIKES_COUNT:
      return {
        ...state,
        data: {
          ...state.data,
          likes: action.payload,
        },
      };
    default:
      return state;
  }
}

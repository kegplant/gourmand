import { ADD_LONG_LAT } from "../actions/location";

export default function location(state = {}, action) {
  switch (action.type) {
    case ADD_LONG_LAT:
      return {
        ...action.data
      };
    default:
      return state;
  }
}

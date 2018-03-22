import { ADD_MONGO } from "../actions/mongo";

export default function addMongo(state = {}, action) {
  switch (action.type) {
    case ADD_MONGO:
      return {
        ...state,
        id: action.id
      };
    default:
      return state;
  }
}

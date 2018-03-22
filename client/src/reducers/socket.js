import { ADD_SOCKET } from "../actions/socket";

export default function sockets(state = {}, action) {
  switch (action.type) {
    case ADD_SOCKET:
      return {
        ...state,
        socketID: action.socketID
      };
    default:
      return state;
  }
}

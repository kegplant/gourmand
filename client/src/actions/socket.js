export const ADD_SOCKET = "ADD_SOCKET";

export function addSocketID(id) {
  return {
    type: ADD_SOCKET,
    socketID: id
  };
}

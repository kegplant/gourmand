export const ADD_MONGO = "ADD_MONGO";

export function addMongo(id) {
  return {
    type: ADD_MONGO,
    id
  };
}

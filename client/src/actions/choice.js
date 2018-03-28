export const ADD_CHOICE = "ADD CHOICE";

export function addChoice(id) {
  return {
    type: ADD_CHOICE,
    id
  };
}

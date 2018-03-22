export const ADD_DETAILS = "ADD_DETAILS";

export function addDetails(details) {
  return {
    type: ADD_DETAILS,
    details: {
      ...details
    }
  };
}

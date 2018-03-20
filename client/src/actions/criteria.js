export const CHANGE_CRITERIA = "CHANGE_CRITERIA";

export function changeCriteria(criteria) {
  return {
    type: CHANGE_CRITERIA,
    criteria: {
      ...criteria
    }
  };
}

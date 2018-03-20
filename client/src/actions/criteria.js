export const CHANGE_CRITERIA = "CHANGE_CRITERIA";

function changeCriteria(criteria) {
  return {
    type: CHANGE_CRITERIA,
    criteria
  };
}

export function handleCriteriaChange(criteria) {
  return dispatch => {
    dispatch(changeCriteria(criteria));
  };
}

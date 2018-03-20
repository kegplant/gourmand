import { _getCategories } from "../utils/_API";

export const CHANGE_CRITERIA = "CHANGE_CRITERIA";

function changeCriteria(criteria) {
  return {
    type: CHANGE_CRITERIA,
    ...criteria
  };
}

export function handleCriteriaChange(newCriteria) {
  return (dispatch, getState) => {
    dispatch(changeCriteria(newCriteria));
    const { criteria } = getState();
    _getCategories(criteria).then(results => {
      console.log(results);
    });
  };
}

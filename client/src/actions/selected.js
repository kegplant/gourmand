export const ADD_SELECTION = "ADD_SELECTION";
export const ADD_ALL_SELECTIONS = "ADD_ALL_SELECTIONS";
export const REMOVE_SELECTION = "REMOVE_SELECTION";

export function addSelection(selection) {
  return {
    type: ADD_SELECTION,
    selected: {
      ...selection
    }
  };
}

export function addAllSelections(selections) {
  return {
    type: ADD_ALL_SELECTIONS,
    selected: {
      ...selections
    }
  };
}

export function removeSelection(category) {
  return {
    type: REMOVE_SELECTION,
    category
  };
}

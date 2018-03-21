// turns array of users into an object with mongo ids as keys
export function flattenCategories(categories) {
  const reducer = (acc, element) => {
    const { category, number, image } = element;
    acc[category] = {
      category,
      number,
      image
    };
    return acc;
  };
  return categories.reduce(reducer, {});
}

export function reconcileSelections(categories, selections) {
  const reconciledSelections = Object.keys(selections)
    .filter(key => {
      return categories.hasOwnProperty(key);
    })
    .reduce((acc, element) => {
      acc[element] = true;

      return acc;
    }, {});

  return reconciledSelections;
}

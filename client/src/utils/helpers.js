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
      const { number, image } = categories[element];
      acc[element] = {
        category: element,
        number,
        image,
        votes: {
          number: 0,
          voters: []
        }
      };

      return acc;
    }, {});

  return reconciledSelections;
}

export function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

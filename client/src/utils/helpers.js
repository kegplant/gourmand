// turns array of users into an object with mongo ids as keys
export function flattenCategories(categories) {
  const reducer = (acc, element) => {
    const { category, number, img } = element;
    acc[category] = {
      category,
      number,
      img
    };
    return acc;
  };
  return categories.reduce(reducer, {});
}

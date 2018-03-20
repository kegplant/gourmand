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

import React, { Component } from "react";
import { connect } from "react-redux";

class Result extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="category-container">
        {categories.map(category => {
          return (
            <div className="category" key={category.category}>
              <p>{category.category}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapToState({ categories }) {
  const categoryArray = Object.keys(categories)
    .map(name => {
      const { category, number, image } = categories[name];
      return {
        category,
        number,
        image
      };
    })
    .sort((a, b) => {
      let categoryA = a.category;
      let categoryB = b.category;
      if (categoryA < categoryB) {
        return -1;
      }
      if (categoryA > categoryB) {
        return 1;
      }
    });

  return {
    categories: categoryArray
  };
}

export default connect(mapToState)(Result);

import React, { Component } from "react";
import { connect } from "react-redux";

class Result extends Component {
  render() {
    const { categories } = this.props;
    console.log(categories);
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

function mapToState({ categories }) {
  const categoryArray = Object.keys(categories)
    .map(name => {
      const { category, number, img } = categories[name];
      return {
        category,
        number,
        img
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

  console.log("test");
  console.log(categoryArray);
  console.log("test");

  return {
    categories: categoryArray
  };
}

export default connect(mapToState)(Result);

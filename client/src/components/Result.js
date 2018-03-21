import React, { Component } from "react";
import { connect } from "react-redux";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleOnClick = (event, category) => {
    const selected = this.state[category] ? false : true;
    console.log(selected);
    this.setState(() => ({
      [category]: selected
    }));
  };

  render() {
    const { categories } = this.props;
    return (
      <div className="category-container">
        {categories.map(category => {
          return (
            <div
              className="category"
              style={{
                outline: this.state[category.category]
                  ? "4px solid #FCDDA5"
                  : "none"
              }}
              key={category.category}
              data-id={category.category}
              onClick={e => this.handleOnClick(e, category.category)}
            >
              <p className="category-number">{category.number}</p>
              <p className="category-text">{category.category}</p>
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

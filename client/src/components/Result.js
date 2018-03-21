import React, { Component } from "react";
import { connect } from "react-redux";
import { addSelection, removeSelection } from "../actions/selected";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: false
    };
  }
  handleOnClick = (event, category) => {
    const selected = this.state[category] ? false : true;
    this.setState(() => ({
      [category]: selected
    }));
    const { dispatch } = this.props;
    if (selected) {
      dispatch(
        addSelection({
          [category]: selected
        })
      );
    }

    if (!selected) {
      dispatch(removeSelection(category));
    }
  };

  selectAll = event => {
    const { checkbox } = this.state;
    let newSetting = checkbox ? false : true;
    this.setState(() => ({
      checkbox: newSetting
    }));
    const { categories } = this.props;
    const reducer = (acc, element) => {
      const { category } = element;
      acc[category] = newSetting;
      return acc;
    };

    const newState = categories.reduce(reducer, {});

    this.setState(() => ({
      ...newState
    }));
  };

  render() {
    const { categories } = this.props;
    return (
      <div>
        <div className="checkbox-container">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
            onChange={this.selectAll}
          />
          <label className="form-check-label" forhtml="defaultCheck1">
            Select All
          </label>
        </div>
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

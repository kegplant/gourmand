import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addSelection,
  removeSelection,
  addAllSelections,
  removeAllSelections
} from "../actions/selected";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: false
    };
  }
  handleOnClick = (event, category) => {
    const { dispatch, categoryFlattened, selection } = this.props;
    const { number, image } = categoryFlattened[category];
    const selected = selection.hasOwnProperty(category) ? false : true;

    if (selected) {
      dispatch(
        addSelection({
          [category]: {
            category,
            number,
            image,
            votes: {
              number: 0,
              voters: []
            }
          }
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
    const { dispatch, categories, categoryFlattened } = this.props;
    this.setState(() => ({
      checkbox: newSetting
    }));
    const reducer = (acc, element) => {
      const { category } = element;
      const { number, image } = categoryFlattened[category];
      acc[category] = {
        category,
        number,
        image,
        votes: {
          number: 0,
          voters: []
        }
      };
      return acc;
    };

    const newState = categories.reduce(reducer, {});

    if (newSetting) {
      dispatch(addAllSelections(newState));
    }

    if (!newSetting) {
      dispatch(removeAllSelections(newState));
    }
  };

  render() {
    const { categories, selection } = this.props;
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
                  outline: selection[category.category]
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

function mapToState({ categories, selection }) {
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
    categories: categoryArray,
    categoryFlattened: categories,
    selection
  };
}

export default connect(mapToState)(Result);

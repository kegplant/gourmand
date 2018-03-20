import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCriteriaChange } from "../actions/shared";

class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: 2
    };
  }

  handleSelection = event => {
    const { value } = event.target;
    console.log(value);
    this.setState(() => ({
      meal: value
    }));
    const { dispatch } = this.props;
    dispatch(
      handleCriteriaChange({
        meal: value
      })
    );
  };

  render() {
    const { meal } = this.state;
    return (
      <div>
        <h2 id="title">Gourmand</h2>
        <div className="row">
          <div className="col-md-2" />
          <ul className="col-md-8 meal-options">
            <li
              value="1"
              style={{
                textDecoration: meal === 1 ? "underline" : "none"
              }}
              onClick={this.handleSelection}
            >
              Breakfast
            </li>
            <li
              value="2"
              style={{
                textDecoration: meal === 2 ? "underline" : "none"
              }}
              onClick={this.handleSelection}
            >
              Lunch
            </li>
            <li
              value="3"
              style={{
                textDecoration: meal === 3 ? "underline" : "none"
              }}
              onClick={this.handleSelection}
            >
              Dinner
            </li>
          </ul>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

export default connect()(Meal);

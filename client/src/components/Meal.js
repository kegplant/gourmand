import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCriteriaChange } from "../actions/criteria";

class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 2
    };
  }

  handleSelection = event => {
    const { value } = event.target;
    this.setState(() => ({
      selection: value
    }));
    const { dispatch } = this.props;
    const { selection } = this.state;
    dispatch(
      handleCriteriaChange({
        selection
      })
    );
  };

  render() {
    const { selection } = this.state;
    return (
      <div>
        <h2 id="title">Gourmand</h2>
        <div className="row">
          <div className="col-md-2" />
          <ul className="col-md-8 meal-options">
            <li
              value="1"
              style={{
                textDecoration: selection === 1 ? "underline" : "none"
              }}
              onClick={this.handleSelection}
            >
              Breakfast
            </li>
            <li
              value="2"
              style={{
                textDecoration: selection === 2 ? "underline" : "none"
              }}
              onClick={this.handleSelection}
            >
              Lunch
            </li>
            <li
              value="3"
              style={{
                textDecoration: selection === 3 ? "underline" : "none"
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

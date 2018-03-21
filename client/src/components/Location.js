import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCriteriaChange } from "../actions/shared";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "3",
      address: "566 Arguello Way, Stanford, CA"
    };

    this.timeout;
  }

  handleLocationSelection = event => {
    const { address } = this.state;
    const { value } = event.target;
    this.setState(() => ({
      location: value
    }));
    const { dispatch } = this.props;

    dispatch(
      handleCriteriaChange({
        location: value
      })
    );
  };

  handleAddressSelection = event => {
    clearTimeout(this.timeout);

    const { value } = event.target;
    const { dispatch } = this.props;

    // Make a new timeout set to go off in 500ms
    this.timeout = setTimeout(() => {
      this.setState(() => ({
        address: value
      }));

      dispatch(
        handleCriteriaChange({
          address: value
        })
      );
    }, 500);
  };

  render() {
    return (
      <div>
        <h5>Distance</h5>
        <div className="info-container">
          <select name="location" onChange={this.handleLocationSelection}>
            <option value="1">1 mile</option>
            <option value="2">2 mile</option>
            <option value="3">3 mile</option>
            <option value="4">4 mile</option>
            <option value="5">5 mile</option>
            <option value="6">Any</option>
          </select>
          <input
            className="address"
            name="address"
            onChange={this.handleAddressSelection}
            type="text"
            placeholder="enter address"
          />
        </div>
      </div>
    );
  }
}

export default connect()(Location);

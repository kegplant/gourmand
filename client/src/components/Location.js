import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCriteriaChange } from "../actions/criteria";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "3",
      address: "566 Arguello Way, Stanford, CA"
    };
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
    const { value } = event.target;
    console.log(value);
    this.setState(() => ({
      address: value
    }));
    const { dispatch } = this.props;

    dispatch(
      handleCriteriaChange({
        address: value
      })
    );
  };

  render() {
    return (
      <div>
        <h5>Distance</h5>
        <div className="location-container">
          <select name="location" onChange={this.handleLocationSelection}>
            <option value="1">1 mile</option>
            <option value="2">2 mile</option>
            <option value="3">3 mile</option>
            <option value="4">4 mile</option>
            <option value="5">5 mile</option>
            <option value="6">Any</option>
          </select>
          <input
            name="address"
            onChange={this.handleAddressSelection}
            type="text"
            value="566 Arguello Way, Stanford, CA"
            placeholder="enter address"
          />
        </div>
      </div>
    );
  }
}

export default connect()(Location);

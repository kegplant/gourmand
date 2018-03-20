import React, { Component } from "react";
import { connect } from "react-redux";

class Location extends Component {
  render() {
    return (
      <div>
        <h5>Distance</h5>
        <div className="location-container">
          <select>
            <option>1 mile</option>
            <option>2 mile</option>
            <option>3 mile</option>
            <option>4 mile</option>
            <option>5 mile</option>
            <option>Any</option>
          </select>
          <input type="text" placeholder="enter address" />
        </div>
      </div>
    );
  }
}

export default connect()(Location);

import React, { Component } from "react";
import { connect } from "react-redux";

class Type extends Component {
  render() {
    return (
      <div>
        <h1>Type</h1>
      </div>
    );
  }
}

export default connect()(Type);

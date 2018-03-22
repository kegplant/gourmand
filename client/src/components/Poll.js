import React, { Component } from "react";
import { handleGetSelection } from "../actions/selection";
import { connect } from "react-redux";

class Poll extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(handleGetSelection(id));
  }
  render() {
    return (
      <div className="container">
        <h1>Poll</h1>
      </div>
    );
  }
}

export default connect()(Poll);

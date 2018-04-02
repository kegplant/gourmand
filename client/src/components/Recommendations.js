import React, { Component } from "react";
import { connect } from "react-redux";
import FaStar from "react-icons/lib/fa/star";
import FaStarHalfEmpty from "react-icons/lib/fa/star-half-empty";
import socketIOClient from "socket.io-client";
import { handleAddChoice } from "../actions/choice";
import { getStarsArray, SERVER_URL } from "../utils/helpers";

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socketIOClient(SERVER_URL),
      selectionIndex: null
    };
  }

  socketChoice = () => {
    const { socket } = this.state;
    const { match } = this.props;
    const pollID = match.params.id;
    socket.emit("user voted", pollID);
  };

  selectionClicked = event => {
    const { recommendations, dispatch, mongo } = this.props;
    const { selectionIndex } = this.state;
    const pollID = mongo.id;
    dispatch(
      handleAddChoice(
        recommendations[selectionIndex],
        pollID,
        this.socketChoice
      )
    );
    this.backButtonPressed();
  };

  backButtonPressed = event => {
    const { history, match } = this.props;
    const name = match.params.name;
    const id = match.params.id;
    const url = `/${name}/${id}`;
    history.push(url);
  };

  handleRecClicked = (event, index) => {
    this.setState(() => ({
      selectionIndex: index
    }));
  };

  isDisabled = () => {
    const { selectionIndex } = this.state;
    const disabled = selectionIndex !== null ? false : true;
    return disabled;
  };

  render() {
    const { recommendations } = this.props;
    const { selectionIndex } = this.state;
    const starsArray = getStarsArray(recommendations);
    return (
      <div className="container">
        <h2 id="title">TasteBuds</h2>
        <div className="rec-container">
          <h5>Your group's recommendations</h5>
          {recommendations.map((rec, index) => {
            return (
              <div
                className="recommendation"
                key={rec.id}
                onClick={e => this.handleRecClicked(e, index)}
                style={{
                  border: selectionIndex === index ? "4px solid #ff4f00" : null
                }}
              >
                <div className="row rec-title">
                  <p className="rec-name">{rec.name} </p>
                  <div className="row stars-container">
                    {starsArray[index].map((element, idx) => {
                      return (
                        <div key={idx}>
                          {element === "Star" ? (
                            <FaStar size={24} style={{ color: "tomato" }} />
                          ) : (
                            <FaStarHalfEmpty
                              size={24}
                              style={{ color: "tomato" }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <button
            className="copy-link"
            onClick={this.selectionClicked}
            disabled={this.isDisabled()}
          >
            Share Selection
          </button>
          <button className="copy-link" onClick={this.backButtonPressed}>
            Back To Poll
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ recommendations, mongo }) {
  return {
    recommendations,
    mongo
  };
}

export default connect(mapStateToProps)(Recommendations);

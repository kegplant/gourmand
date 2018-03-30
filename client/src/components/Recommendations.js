import React, { Component } from "react";
import { connect } from "react-redux";
import FaStar from "react-icons/lib/fa/star";
import FaStarHalfEmpty from "react-icons/lib/fa/star-half-empty";
import { addChoice } from "../actions/choice";
import socketIOClient from "socket.io-client";
import { handleAddChoice } from "../actions/choice";

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socketIOClient("http://localhost:8000")
    };
  }

  socketChoice = () => {
    const { socket } = this.state;
    const { match } = this.props;
    const pollID = match.params.id;
    socket.emit("restaurant chosen", pollID);
  };

  selectionClicked = event => {
    const { choice, dispatch, mongo } = this.props;
    const pollID = mongo.id;
    dispatch(handleAddChoice(choice, pollID, this.socketChoice));
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
    const { dispatch, recommendations, mongo } = this.props;
    dispatch(addChoice(recommendations[index]));
  };

  isDisabled = () => {
    const { choice } = this.props;
    const disabled = choice !== null ? false : true;
    return disabled;
  };

  getStarsArray = recommendations => {
    const result = recommendations.map(restaurant => {
      const num = Math.floor(restaurant.rating);
      const arr = [];
      for (let i = 0; i < num; i++) {
        arr.push("Star");
      }

      if (restaurant.rating !== num) {
        arr.push("Half");
      }
      return arr;
    });

    return result;
  };

  render() {
    const { recommendations, choice } = this.props;
    const starsArray = this.getStarsArray(recommendations);
    return (
      <div className="rec-container">
        <h5>Your group's recommendations</h5>
        {recommendations.map((rec, index) => {
          return (
            <div
              className="recommendation"
              key={rec.id}
              onClick={e => this.handleRecClicked(e, index)}
              style={{
                border: choice.id === rec.id ? "4px solid #ff4f00" : null
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
          className="btn btn-success"
          onClick={this.selectionClicked}
          disabled={this.isDisabled()}
        >
          Share Selection
        </button>
        <button className="btn btn-warning" onClick={this.backButtonPressed}>
          Back To Poll
        </button>
      </div>
    );
  }
}

function mapStateToProps({ recommendations, choice, mongo }) {
  return {
    recommendations,
    choice,
    mongo
  };
}

export default connect(mapStateToProps)(Recommendations);

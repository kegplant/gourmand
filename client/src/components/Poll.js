import React, { Component } from "react";
import { handleGetPollData } from "../actions/shared";
import { connect } from "react-redux";
import { generateUID } from "../utils/helpers";
import { handleAddVote } from "../actions/selection";
import { addSocketID } from "../actions/socket";
import socketIOClient from "socket.io-client";
import { handleGetRecommendations } from "../actions/recommendations";
import Recommendations from "./Recommendations";

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: false,
      copySuccess: false,
      socket: socketIOClient("http://localhost:8000"),
      pollID: this.props.match.params.id,
      originator: false
    };

    //get a unique userid for user
    const { pollID } = this.state;
    if (!localStorage.getItem(pollID)) {
      localStorage.setItem(pollID, generateUID());
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { pollID, socket } = this.state;
    dispatch(handleGetPollData(pollID));

    socket.on("update_votes", function(data) {
      const { pollID } = data;
      dispatch(handleGetPollData(pollID));
    });

    if (localStorage.getItem("originator")) {
      console.log("orig");
      this.setState(() => ({
        originator: true
      }));
    }

    socket.emit("joined poll", pollID);
  }

  socketVote = () => {
    const { pollID, socket } = this.state;
    socket.emit("user voted", pollID);
  };

  handleOnClick = (event, category, voters) => {
    const { voted } = this.state;
    const { pollID } = this.state;
    const { dispatch } = this.props;
    const id = localStorage.getItem(pollID);
    const add = !voters.includes(id);

    this.setState(() => ({
      voted: true
    }));

    dispatch(
      handleAddVote(
        {
          selected: category,
          id,
          pollID,
          add
        },
        this.socketVote
      )
    );
  };

  handleEndPollClicked = event => {
    const { dispatch } = this.props;
    const { pollID } = this.state;
    dispatch(handleGetRecommendations(pollID));
  };

  isDisabled = () => {
    const { selected, voted } = this.state;
    return selected === "" || voted;
  };

  handleCopy = event => {
    document.getElementById("shareable-link").select();
    document.execCommand("copy");
    this.setState(() => ({
      copySuccess: true
    }));
    document.getElementById("shareable-link").blur();
  };

  render() {
    const { selection, hasRec } = this.props;
    const { selected, copySuccess, pollID, originator } = this.state;
    const { address, location, price, meal } = this.props.criteria;
    const { pathname } = this.props.location;
    const id = localStorage.getItem(pollID);
    const link = `http://localhost:3000${pathname}`;
    const priceList = {
      1: "All",
      2: "$",
      3: "$$",
      4: "$$$",
      5: "$$$$"
    };
    const mealList = {
      1: "breakfast",
      2: "lunch",
      3: "dinner"
    };

    const searchCriteria = `Poll created for ${
      priceList[price]
    } spots located within ${location} miles of ${address} open at ${
      mealList[meal]
    } time. `;
    return (
      <div className="container">
        <h2 id="title">TasteBuds</h2>
        {hasRec === true ? (
          <div>
            <Recommendations />
          </div>
        ) : (
          <div>
            <h5>You've been invited to vote</h5>
            <div className="vote-container">
              <div className="category-container">
                {selection.map(element => {
                  return (
                    <div
                      className="category"
                      key={element.category}
                      data-id={element.category}
                      style={{
                        outline: element.votes.voters.includes(id)
                          ? "4px solid #ff4f00"
                          : "none"
                      }}
                      onClick={e =>
                        this.handleOnClick(
                          e,
                          element.category,
                          element.votes.voters
                        )
                      }
                    >
                      <p className="category-number vote-number">
                        {element.votes.number}
                      </p>

                      <p className="category-text">{element.category}</p>
                    </div>
                  );
                })}
              </div>
              {originator === true ? (
                <button
                  className="btn btn-danger end-poll"
                  onClick={this.handleEndPollClicked}
                >
                  End Poll
                </button>
              ) : null}
            </div>

            <h6 className="search-criteria">{searchCriteria}</h6>
            <h5>Shareable Poll Link</h5>
            <div className="row">
              <div className="col-md-6">
                <textarea
                  id="shareable-link"
                  defaultValue={link}
                  className="shareable-link"
                />
              </div>
              {copySuccess ? (
                <div className="col-md-6">
                  <p className="copied-link">Link copied to clipboard.</p>
                </div>
              ) : null}
            </div>
            <div className="col-md-6">
              <button onClick={this.handleCopy} className="copy-link">
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapPropsToState({ selection, criteria, recommendations }) {
  const hasRec = recommendations.length === 0 ? false : true;

  const newSelection = Object.keys(selection).map(element => {
    const { category, number, image, votes } = selection[element];
    return {
      category,
      number,
      image,
      votes
    };
  });

  return {
    selection: newSelection,
    criteria,
    hasRec
  };
}

export default connect(mapPropsToState)(Poll);

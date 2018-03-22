import React, { Component } from "react";
import { handleGetPollData } from "../actions/shared";
import { connect } from "react-redux";
import { generateUID } from "../utils/helpers";
import { handleAddVote } from "../actions/selection";

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      previous: "",
      copySuccess: false
    };

    //get a unique userid for user
    const { id } = this.props.match.params;
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, generateUID());
    }
  }
  componentDidMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(handleGetPollData(id));
  }

  handleOnClick = (event, category) => {
    const { previous } = this.state;
    this.setState(() => ({
      selected: category,
      previous
    }));
    const { dispatch } = this.props;
    const pollID = this.props.match.params.id;
    const id = localStorage.getItem(pollID);
    dispatch(
      handleAddVote({
        selected: category,
        previous,
        id
      })
    );
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
    const { selection } = this.props;
    const { selected, copySuccess } = this.state;
    const { address, location, price, meal } = this.props.criteria;
    const { pathname } = this.props.location;
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
        <h2 id="title">Gourmand</h2>
        <h5>You've been invited to vote</h5>
        <div>
          <div className="category-container">
            {selection.map(element => {
              return (
                <div
                  className="category"
                  key={element.category}
                  data-id={element.category}
                  style={{
                    outline:
                      selected === element.category
                        ? "4px solid #FCDDA5"
                        : "none"
                  }}
                  onClick={e => this.handleOnClick(e, element.category)}
                >
                  <p className="category-number vote-number">
                    {element.votes.number}
                  </p>

                  <p className="category-text">{element.category}</p>
                </div>
              );
            })}
          </div>
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
    );
  }
}

function mapPropsToState({ selection, criteria }) {
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
    criteria
  };
}

export default connect(mapPropsToState)(Poll);

import React, { Component } from "react";
import { connect } from "react-redux";
import { addDetails } from "../actions/details";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "gourmand-user",
      event: "my-event"
    };
  }

  componentWillReceiveProps(nextProps) {
    const { socketID } = nextProps;
    const url = `http://localhost:3000/my-event/${socketID}`;
    this.setState(() => ({
      url
    }));
  }

  handleCreatePollClicked = e => {
    let { name, event } = this.state;
    const { socketID, dispatch } = this.props;

    if (name === "") {
      name = "gourmand-user";
    }
    if (event === "") {
      event = "my-event";
    }

    const url = `http://localhost:3000/${event}/${socketID}`;

    dispatch(
      addDetails({
        name,
        event,
        url
      })
    );
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value
    }));

    if (name === "event") {
      const { socketID } = this.props;
      const newVal = value.replace(/\s+/g, "-").toLowerCase();
      const newURL = `http://localhost:3000/${newVal}/${socketID}`;
      this.setState(() => ({
        url: newURL
      }));
    }
  };
  render() {
    const { url } = this.state;
    return (
      <div className="details">
        <div className="row">
          <div className="col-md-6">
            <div>
              <h5>Event Details (optional)</h5>
              <div className="info-container">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name (optional)"
                  onChange={this.handleInputChange}
                />
                <input
                  type="text"
                  name="event"
                  placeholder="Event name (optional)"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <h5>Create poll</h5>
              <div className="info-container">
                <button
                  className="poll-buttons"
                  onClick={this.handleCreatePollClicked}
                >
                  Create Poll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ socket }) {
  const { socketID } = socket;
  return {
    socketID
  };
}

export default connect(mapStateToProps)(Details);

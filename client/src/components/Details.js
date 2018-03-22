import React, { Component } from "react";
import { connect } from "react-redux";
import { addDetails } from "../actions/details";
import { handleCreatePoll } from "../actions/shared";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "gourmand-user",
      event: "my-event"
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id) {
      const { history } = this.props;
      const { event } = this.state;
      const url = `/${event}/${nextProps.id}`;
      history.push(url);
    }
  }

  handleCreatePollClicked = e => {
    let { name, event } = this.state;
    const { dispatch } = this.props;

    if (name === "") {
      name = "gourmand-user";
    }
    if (event === "") {
      event = "my-event";
    }

    dispatch(
      addDetails({
        name,
        event
      })
    );

    dispatch(handleCreatePoll());

    //const { history } = this.props;
    //history.push(url);
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value
    }));
  };
  render() {
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

function mapStateToProps({ socket, mongo }) {
  const { socketID } = socket;
  const { id } = mongo;
  return {
    socketID,
    id
  };
}

export default connect(mapStateToProps)(Details);

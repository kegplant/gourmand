import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import New from "./New";
import Poll from "./Poll";
import LoadingBar from "react-redux-loading";

class App extends Component {
  render() {
    return (
      <div>
        <LoadingBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={New} />
            <Route exact path="/:id" component={Poll} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

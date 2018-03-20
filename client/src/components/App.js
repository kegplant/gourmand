import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import New from "./New";
import Poll from "./Poll";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={New} />
          <Route exact path="/:id" component={Poll} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

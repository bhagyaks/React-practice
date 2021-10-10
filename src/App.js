import React from "react";
import "./styles.css";
import Success from "./Success";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FetchCheck from "./FetchCheck";
const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <FetchCheck/>
          </Route>
          <Route path="/success" exact>
            <Success />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
import UsersList from "./hooks/components/UsersList";
import AddUser from "./hooks/components/AddUser";
import UpdateUser from "./hooks/components/UpdateUser";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={UsersList} />
          <Route exact path="/create" component={AddUser} />
          <Route exact path="/update/:id" component={UpdateUser} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;

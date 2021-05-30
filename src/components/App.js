import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// react-router-dom is a library that allows you to have multi-page applications using React

import { AuthProvider } from "../contexts/AuthContext";

import Chats from "./Chats";
import Login from "./Login";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        {/* The AuthProvider handles the entire application state. */}
        <AuthProvider>
          <Switch>
            {/* Using a switch component in React Router, means that whenever a route's path matches the url path, the router will render the route's component. */}
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";

import { Provider } from "react-redux";
import store from "./redux/store";
import Admin from "./components/Admin";
import Page404 from "./components/Page404";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* <Route path="/login" exact render={props => <Login />} /> */}
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />

            <Route path="/" exact component={Main} />
            <Route path="/admin" exact component={Admin} />
            <Route exact component={Page404} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

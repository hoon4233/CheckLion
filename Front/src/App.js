import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./routes/Home";
import Landing from "./routes/Landing";
import Login from "./routes/Login";
import Team from "./routes/Team";
import Teamselect from "./routes/Teamselect";
import './App.css';
import Registration from "./routes/Registration";
import AddPoint from "./routes/AddPoint";
import ChangePassword from "./routes/ChangePassword";


function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/registration" exact component={Registration} />
      <Route path="/teams" exact component={Teamselect} />
      <Route path="/teams/:name" exact component={Team} />
      <Route path="/addPoint" exact component={AddPoint} />
      <Route path="/changPW" exact component={ChangePassword} />
    </Switch>

  </BrowserRouter>
  );
}

export default App;

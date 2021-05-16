import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Landing from "./routes/Landing";
import Login from "./routes/Login";
import Team from "./routes/Team";
import Teamselect from "./routes/Teamselect";
import './App.css';




function App() {
  return (
  <HashRouter>
    <Route path="/" exact={true} component={Landing} />
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/teamselect" component={Teamselect} />
    <Route path="/team" component={Team} />
  </HashRouter>
  );
}

export default App;

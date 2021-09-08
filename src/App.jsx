import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Mdb from "./Components/Mdb";
import Movie from "./Components/Movie";
function App() {
  localStorage.setItem("search_term", "");
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact>
            <Mdb></Mdb>
          </Route>
          <Route path="/movie/:movie_id" exact>
            <Movie></Movie>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

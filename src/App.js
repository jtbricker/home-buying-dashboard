import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Listings from "./components/Listings";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/listings" className="navbar-brand">
          Bud Home Search
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/listings"} className="nav-link">
              Listings
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>House Search Dashboard</h2>
        <Switch>
          <Route exact path={["/", "/listings"]} component={Listings} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
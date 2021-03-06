import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./containers/Home";
import store from "./store";
import "bulma/css/bulma.css";
import "./stylesheets/style.scss";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

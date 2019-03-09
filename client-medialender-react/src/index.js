import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./components/common/loader.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <App />
    </React.Fragment>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();

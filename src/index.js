import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/AuthProvider";
import MylistProvider from "./store/MylistProvider";
import App from "./App";

ReactDOM.render(
  <AuthProvider>
    <MylistProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MylistProvider>
  </AuthProvider>,
  document.querySelector("#root")
);

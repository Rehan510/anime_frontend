import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import SocketService from "./services/sockets.service";
import InitializationService from "services/initialization.service";
import { Provider } from "react-redux";
import { store } from "redux/store";
import io from "socket.io-client";
InitializationService.init();
const socket = io("http://localhost:3001/");
SocketService.init(socket);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

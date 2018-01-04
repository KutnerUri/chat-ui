
//This is then entry point for your app. Do as you wish.

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components";
import io from "socket.io-client";
import ServerSocket from "./services/serverSocket";

ReactDOM.render(<App />, document.getElementById("root"));

const serverSocket = new ServerSocket();
serverSocket.start();
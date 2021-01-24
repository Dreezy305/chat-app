import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducers from "./reducers";
import setupSocket from "./sockets/index";
import handleNewMessage from "./sagas/index";
import username from "./utils/name";

const sagaMiidleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiidleware));

//store.dispatch(addUser("Me"));

const socket = setupSocket(store.dispatch, username);

sagaMiidleware.run(handleNewMessage, { socket, username });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();

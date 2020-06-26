import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';

// import {composeWithDevTools} from 'redux-devtools-extension'

import App from "./js/components/home";
import reducers from "./js/reducers/index";



const store = createStore(
  reducers,
  applyMiddleware(thunk)
);


console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
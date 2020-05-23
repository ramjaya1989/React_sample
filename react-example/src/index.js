import React from "react";
import jQuery from "jQuery";
import bootstrap from "bootstrap";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Service from "./ServiceProviders/Components/service";
import serviceReducer from "./ServiceProviders/Reducer/serviceReducer";

const store = createStore(serviceReducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Service />
  </Provider>,
  document.getElementById("root")
);

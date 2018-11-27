import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

export const store = createStore(
  reducers,
  {},
  composeEnhancers(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

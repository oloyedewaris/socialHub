import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise";
import rootReducer from "./redux/reducers/index";

const initialState = {};

const middleware = [thunkMiddleware, promiseMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //   window.__REDUX_DEVTOOLS_EXTENSION__({
    //     trace: true,
    //     traceLimit: 25
    //   })
  )
);

export default store;

import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { petsReducer } from "./Pets/reducer";

export const rootReducer = combineReducers({
  pets: petsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

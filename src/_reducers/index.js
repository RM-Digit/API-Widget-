import { combineReducers } from "redux";
import uiReducer from "./ui_reducers";
const rootReducer = combineReducers({
  ui: uiReducer,
});

export default rootReducer;

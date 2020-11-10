import dateReducer from "./DateReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  dateReducer,
});

export default allReducers;

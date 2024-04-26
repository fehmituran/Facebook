import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { themeReducer } from "./themeReducers";

const rootReducer = combineReducers({
  user: userReducer,
  darkTheme: themeReducer,
});

export default rootReducer;

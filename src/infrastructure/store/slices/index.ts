import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./user/authSlice";
import projectsReducer from "./projects/projectsSlices";
// import projectReducer from "./projectReducer";
// import taskReducer from "./taskReducer";

// Combinaison de tous les reducers
const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  //   task: taskReducer,
});

export default rootReducer;

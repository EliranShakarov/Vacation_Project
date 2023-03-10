import { combineReducers } from "redux";
import { userReducer } from "./userState";
import { configureStore } from "@reduxjs/toolkit";


const reducers = combineReducers({ userState: userReducer });
export const store = configureStore({ reducer: reducers });
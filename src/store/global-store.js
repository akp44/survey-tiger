import {  configureStore } from "@reduxjs/toolkit";
import {surveySlice} from './SurveySlice'
import { responseSlice } from "./responseSlice";
import { combineReducers } from "redux";


const rootReduce = combineReducers({
    surveys: surveySlice.reducer, 
    responses: responseSlice.reducer
});

export const store = configureStore({reducer: rootReduce});
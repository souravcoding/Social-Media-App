import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import { UserReducer } from "./Reducers/UserReducer";
import Users from "./Reducers/Users";

const rootReducer=combineReducers({
    user:UserReducer,
    users:Users

})

export const store=createStore(rootReducer,applyMiddleware(thunk))
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {profileReducer} from "../reducers/profile-reducer";


const reducers = combineReducers({
    profile: profileReducer
});

const store = createStore(reducers, applyMiddleware(thunk));
export default store

export type AppRootStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev
import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "../reducers/profile-reducer";
import {authReducer} from "../reducers/auth-reducer";
import {RecoveryReducer} from "../../auth/recovery-password/RecoveryReducer";
import {registrationReducer} from "../reducers/registration-reducer";
import {loginReducer} from "../reducers/Login-Reducer";
import thunk from "redux-thunk";
import {appReducer} from "../reducers/appReducer";
import {packsReducer} from "../../pages/Card/bll/PacksReducer";
import {cardsReducer} from "../../pages/Card/bll/CardsReducer";


const reducers = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    registration: registrationReducer,
    recovery: RecoveryReducer,
    logIn: loginReducer,
    app:appReducer,
    packs: packsReducer,
    cards: cardsReducer
});

const store = createStore(reducers, applyMiddleware(thunk));
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev
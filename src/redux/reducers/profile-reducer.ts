import {Dispatch} from "redux";
import {ResponseDataType} from "../../api/LoginApi";


export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}



const initialState = { user: {} as UserType }
export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_USER": {
            let stateCopy = {...state}
            stateCopy = {...stateCopy, user: action.user}
            return {...stateCopy}
        }
        default:
            return state
    }
}
// actions
export const AC = () => ({type: '---'} as const)
export const setUserAc = (user :UserType) => ({type: "SET_USER", user} as const)


// thunks
export const TC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
}

// types
type ActionsType = ReturnType<typeof AC> | ReturnType<typeof setUserAc>


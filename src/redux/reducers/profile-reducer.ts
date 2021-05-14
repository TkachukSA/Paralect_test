import {Dispatch} from "redux";
import {gitHubAPI, ReposResponseType, UserResponseType} from "../../api/api";


const initialState = {
    user: {} as UserResponseType,
    repos: [] as ReposResponseType[],
    userNotFound: false
}
export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_USER": {
            let stateCopy = {...state}
            stateCopy = {...stateCopy, user: action.user}
            return {...stateCopy}
        }
        case "SET_REPOS":{
            return {...state, repos: action.data}
        }
        case "USER_NOT_FOUND":{
            return {...state, userNotFound: action.isFound }
        }
        default:
            return state
    }
}
// actions
export const setReposAC = (data: any) => ({type: 'SET_REPOS', data} as const)
export const setUserAc = (user: any) => ({type: "SET_USER", user} as const)
export const userNotFoundAc = (isFound: boolean) => ({type: "USER_NOT_FOUND", isFound} as const)


// thunks
export const setUserTC = (userName: string, per_page?: number, page?: number| undefined) => (dispatch: Dispatch<ActionsType>) => {
    gitHubAPI.getUser(userName).then((res) => {
        dispatch(setUserAc(res.data))
        dispatch(userNotFoundAc(false))
    }).catch((err)=>{
        dispatch(userNotFoundAc(true))
        console.log(err.response.data)
    })
    gitHubAPI.getRepos(userName, per_page, page).then((res)=>{
        dispatch(setReposAC(res.data))
    })
}

// types
type ActionsType = ReturnType<typeof setReposAC> | ReturnType<typeof setUserAc>| ReturnType<typeof userNotFoundAc>


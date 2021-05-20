import {Dispatch} from "redux";
import {gitHubAPI, ReposResponseType, UserResponseType} from "../../../dal/api/api";

export type RedType = 'true' | 'false' | 'start'

const initialState = {
    user: {} as UserResponseType,
    repos: [] as ReposResponseType[],
    userNotFound: 'start' as RedType,
    loading: false
}
export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_USER": {
            let stateCopy = {...state}
            stateCopy = {...stateCopy, user: action.user}
            return {...stateCopy}
        }
        case "SET_REPOS": {
            return {...state, repos: action.data}
        }
        case "USER_NOT_FOUND": {
            return {...state, userNotFound: action.isFound}
        }
        case "LOADING_STATUS": {
            return {...state, loading: action.loading}
        }
        default:
            return state
    }
}
// actions
export const setReposAC = (data: ReposResponseType[]) => ({type: 'SET_REPOS', data} as const)
export const setUserAc = (user: UserResponseType) => ({type: "SET_USER", user} as const)
export const userNotFoundAc = (isFound: RedType) => ({type: "USER_NOT_FOUND", isFound} as const)
export const loadingAC = (loading: boolean) => ({type: "LOADING_STATUS", loading} as const)


// thunks
export const setUserTC = (userName: string, per_page?: number, page?: number | undefined) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(loadingAC(true))
        const pr1 = await gitHubAPI.getUser(userName)
        const pr2 = await gitHubAPI.getRepos(userName, per_page, page)
        const res = await Promise.all([pr1, pr2])

        const data1 = res[0].data
        dispatch(setUserAc(data1))
        dispatch(userNotFoundAc('true'))

        const data2 = res[1].data
        dispatch(setReposAC(data2))
    } catch (error) {
        dispatch(userNotFoundAc('false'))
    } finally {
        dispatch(loadingAC(false))
    }
}

// types
type ActionsType =
    | ReturnType<typeof setReposAC>
    | ReturnType<typeof setUserAc>
    | ReturnType<typeof userNotFoundAc>
    | ReturnType<typeof loadingAC>


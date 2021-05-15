import {Dispatch} from "redux";
import {gitHubAPI, ReposResponseType, UserResponseType} from "../../api/api";

export type RedType= 'true' | 'false' | 'start'

const initialState = {
    user: {} as UserResponseType,
    repos: [] as ReposResponseType[],
    userNotFound : 'start' as RedType
}
export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    debugger
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
        default:
            return state
    }
}
// actions
export const setReposAC = (data: any) => ({type: 'SET_REPOS', data} as const)
export const setUserAc = (user: any) => ({type: "SET_USER", user} as const)
export const userNotFoundAc = (isFound: RedType) => ({type: "USER_NOT_FOUND", isFound} as const)


// thunks
export const setUserTC = (userName: string, per_page?: number, page?: number | undefined) => (dispatch: Dispatch<ActionsType>) => {
    debugger
    const pr1 = gitHubAPI.getUser(userName)
    const pr2 = gitHubAPI.getRepos(userName, per_page, page)

    Promise.all([pr1, pr2]).then((res) => {
        debugger
        const data1 = res[0].data
        dispatch(setUserAc(data1))
        dispatch(userNotFoundAc('true'))

        const data2 = res[1].data
        dispatch(setReposAC(data2))
    }).catch((err) => {
        debugger
        dispatch(userNotFoundAc('false'))
        /*alert(err.response.data.message)*/
    })

}

/*export const setUserTC = (userName: string, per_page?: number, page?: number | undefined) => async (dispatch: Dispatch<any>) => {
    try {
        const pr1 = await gitHubAPI.getUser(userName)
        const pr2 = await gitHubAPI.getRepos(userName, per_page, page)

        let res = await Promise.all([pr1, pr2])

        await dispatch(setUserAc(res[0].data))
        await dispatch(userNotFoundAc(false))
        await dispatch(setReposAC(res[1].data))


    } catch (error) {
        dispatch(userNotFoundAc(true))
    }
}*/

// types
type ActionsType = ReturnType<typeof setReposAC> | ReturnType<typeof setUserAc> | ReturnType<typeof userNotFoundAc>


import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.github.com/',
    /*   withCredentials: true*/
})


export const gitHubAPI = {
    getUser(userName: string) {
        return instance.get<UserResponseType>(`users/${userName}`)
    },
    getRepos(userName: string , per_page : number = 4, page: number | undefined) {

        return instance.get<ReposResponseType[]>(`users/${userName}/repos`, {
            params: {
                per_page,
                page
            }
        } )
    }
}



export type UserResponseType = {
    "login": string,
    "id": number,
    "avatar_url": string,
    "html_url": string,
    "public_repos": number,
    "followers": number,
    "following": number,
    "name": string

}
export type ReposResponseType = {
    "description": string,
    "id": number,
    "html_url": string,
    "name": string
}
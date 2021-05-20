import {InitialStateType, loadingAC, profileReducer, setReposAC, setUserAc, userNotFoundAc} from "./profile-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        loading: false,
        userNotFound: 'false',
        repos: [
            {
                "description": 'description',
                "id": 101,
                "html_url": '',
                "name": 'Sergey'
            }
        ],
        user: {
            "login": 'Sergey',
            "id": 101,
            "avatar_url": '',
            "html_url": 'https://www.figma.com/',
            "public_repos": 15,
            "followers": 7,
            "following": 77,
            "name": 'Serey Tkavhuk'
        }

    }
})

test('correct error repositories should be set', () => {
    const newState = [{
        "description": 'description',
        "id": 2502,
        "html_url": '',
        "name": 'gitHubApi'
    }]

    const endState = profileReducer(startState, setReposAC(newState))

    expect(endState.repos.length).toBe(1);
})

test('correct loading should be set', () => {

    const endState = profileReducer(startState, loadingAC(true))

    expect(endState.loading).toBe(true);
})

test('correct status should be set', () => {

    const endState = profileReducer(startState, userNotFoundAc('true'))
    const endState_ = profileReducer(startState, userNotFoundAc('start'))

    expect(endState.userNotFound).toBe('true');
    expect(endState_.userNotFound).toBe('start');
})
test('the correct user must be installed', () => {
    const newState = {
        "login": 'Sergey',
        "id": 2502,
        "avatar_url": '',
        "html_url": 'https://www.figma.com/',
        "public_repos": 100,
        "followers": 7,
        "following": 77,
        "name": 'Serey Tkavhuk'
    }

    const endState = profileReducer(startState, setUserAc(newState))

    expect(endState.user.id).toBe(2502);
    expect(endState.user.public_repos).toBe(100);
})

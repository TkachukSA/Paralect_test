import React, {useEffect} from 'react';
import s from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store/store";
import {ReposResponseType, UserResponseType} from "./api/api";
import {Redirect, useParams} from "react-router-dom";
import {RedType, setUserTC} from "./redux/reducers/profile-reducer";
import ReactPaginate from 'react-paginate';
import "bootstrap/scss/bootstrap.scss";
import {InitialState} from "./InitialState";
import emptyList from "./asses/image/emptyList.svg";


function Profile() {
    const user = useSelector<AppRootStateType, UserResponseType>(state => state.profile.user)
    const repos = useSelector<AppRootStateType, ReposResponseType[]>(state => state.profile.repos)
    const isFound = useSelector<AppRootStateType, RedType>(state => state.profile.userNotFound)
    const {userId} = useParams<Record<string, string | undefined>>();
    const dispatch = useDispatch()


    useEffect(() => {
        debugger
        if (userId) {
            dispatch(setUserTC(userId))
        }

    }, [])


    if (isFound === "false") {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={s.mainBlock}>
            <div className={s.container}>
                <div className={s.test}>
                    <div className={s.infoContainer}>
                        <img className={s.avatar} src={user.avatar_url}/>
                        <div className={s.mainInfo}>
                            <div>{user.login}</div>
                            <div><a href={user.html_url}>ссылка</a></div>
                            <div className={s.followers}>
                                <span>followers :{user.followers}</span>
                                <span>following {user.following}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.testRed}>

                    {
                        user.public_repos === 0 ? <div className={s.items}>
                                <div>
                                    <img src={emptyList}/>
                                </div>
                                <div>
                                    Repository list is empty
                                </div>
                            </div>
                            : <Repositories repos={repos} user={user}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;

type RepositoriesType = {
    user: UserResponseType
    repos: ReposResponseType[]
}

function Repositories(props: RepositoriesType) {
    const dispatch = useDispatch()

/*    const items = (selected: any) => {
        let b2 = selected * 4
        let a = b2 - 3
debugger
        return (<div>
                {a} {b2}
            </div>
        )
    }
    let asa = null*/

    const setPage = ({selected}: any) => {
        dispatch(setUserTC(props.user.login, 4, selected + 1))
   /*     asa = items(selected)*/
    }


    return (<>
        <h1 className={s.reposContainer}>Repositories {`(${props.user.public_repos})`}</h1>
        {props.repos.map(r => {
            return <div className={s.reposContainer} key={r.id}>
                <div className={s.itemRepos}>
                    <div>{<a href={r.html_url}>{r.name}</a>}</div>
                    <div>{r.description}</div>
                </div>
            </div>
        })}

        <div>
            <ReactPaginate
                pageCount={Math.ceil(props.user.public_repos / 4)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                onPageChange={setPage}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                previousLinkClassName="page-link"
                pageClassName={"page-item"}
                breakClassName={"page-item"}
                nextClassName={"page-item"}
                previousClassName={"page-item"}
                previousLabel={<>&laquo;</>}
                nextLabel={<>&raquo;</>}
            />
        </div>
    </>)
}

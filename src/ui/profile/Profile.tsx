import React, {useEffect} from 'react';
import s from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/redux/store/store";
import {ReposResponseType, UserResponseType} from "../../dal/api/api";
import {Redirect, useParams} from "react-router-dom";
import {RedType, setUserTC} from "../../bll/redux/reducers/profile-reducer";
import "bootstrap/scss/bootstrap.scss";
import l from '../../asses/loading/Loading.module.css'
import emptyList from "../../asses/image/emptyList.svg";
import {Repositories} from "../repositories/Repositories";
import group from '../../asses/image/group.svg'
import provate from '../../asses/image/provate.svg'


export const Profile = React.memo(() => {
    const user = useSelector<AppRootStateType, UserResponseType>(state => state.profile.user)
    const repos = useSelector<AppRootStateType, ReposResponseType[]>(state => state.profile.repos)
    const isFound = useSelector<AppRootStateType, RedType>(state => state.profile.userNotFound)
    const loading = useSelector<AppRootStateType, boolean>(state => state.profile.loading)
    const {userId} = useParams<Record<string, string | undefined>>();
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            dispatch(setUserTC(userId))
        }

    }, [dispatch, userId])


    if (isFound === "false") {
        return <Redirect to={'/'}/>
    }

    return (<>
        {loading && <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <div className={l.loader}>Loading...</div>
        </div>}
        <div className={s.mainBlock}>
            <div className={s.container}>
                <div className={s.test}>
                    <div className={s.infoContainer}>
                        <img alt={''} className={s.avatar} src={user.avatar_url}/>
                        <div className={s.mainInfo}>
                            <h2>{user.name}</h2>
                            <div><a rel="noreferrer" target={"_blank"} href={user.html_url}>{user.login}</a></div>
                            <div className={s.followers}>
                                <img alt={''} src={group}/> <span>followers :{user.followers}</span>
                                <img alt={''} src={provate}/><span>following {user.following}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.testRed}>

                    {
                        user.public_repos === 0 ? <div className={s.emptyList}>
                                <div>
                                    <img alt={''} src={emptyList}/>
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
    </>);
})


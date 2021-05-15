import React from 'react';
import s from './InitialState.module.css'
import findImg from './asses/image/image.svg'
import userNotFound from './asses/image/notFound.svg'
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store/store";
import { Redirect } from 'react-router-dom';
import {RedType} from "./redux/reducers/profile-reducer";


export const InitialState: React.FC = () => {
    const isFound = useSelector<AppRootStateType, RedType>(state => state.profile.userNotFound)

    if (isFound === "true") {
        return <Redirect to={'/profile/'}/>
    }


    return (
        <div className={s.mainBlock}>
            <div className={s.container}>
                {
                    isFound === "false" ? <>
                        <div>
                            <img src={userNotFound}/>
                        </div>
                        <div>
                            User not found
                        </div>
                    </> : <>
                        <div>
                            <img src={findImg}/>
                        </div>
                        <div>
                            Start with searching a GitHub user
                            Typography
                        </div>
                    </>
                }

            </div>
        </div>
    );
}



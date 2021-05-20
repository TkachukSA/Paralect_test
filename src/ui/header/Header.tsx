import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import style from './Header.module.css'
import ims from './Vector.svg'
import {useDispatch, useSelector} from "react-redux";
import {RedType, setUserTC} from "../../bll/redux/reducers/profile-reducer";
import {AppRootStateType} from "../../bll/redux/store/store";


export const Header = React.memo(() => {
    const isFound = useSelector<AppRootStateType, RedType>(state => state.profile.userNotFound)
    const dispatch = useDispatch()
    const history = useHistory();
    const [value, setValue] = useState('')

    useEffect(() => {

    }, [isFound])

    const findUser = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            history.push('/profile/' + value);
            dispatch(setUserTC(value))
        }
    }, [dispatch, history, value])
    const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, [])

    return (
        <div className={style.header}>
            <div className={style.nav}>
                <div><img alt={''} src={ims}/></div>
                <div><input value={value} onKeyPress={findUser} onChange={onChangeValue}/></div>
            </div>
        </div>
    );
})



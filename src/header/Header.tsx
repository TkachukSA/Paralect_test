import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {NavLink, Redirect, useHistory} from 'react-router-dom';
import style from './Header.module.css'
import ims from './Vector.svg'
import {useDispatch, useSelector} from "react-redux";
import {RedType, setUserTC} from "../redux/reducers/profile-reducer";
import {AppRootStateType} from "../redux/store/store";
import {UserResponseType} from "../api/api";



function Header() {
    const isFound = useSelector<AppRootStateType, RedType>(state => state.profile.userNotFound)
    const user = useSelector<AppRootStateType, UserResponseType>(state => state.profile.user)
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    useEffect(()=>{
        /*if(isFound === 'false'){
            alert('не найден')
        }if(isFound === "true"){
            alert('найден')
        }*/
    },[ isFound])
    const history = useHistory();
    const findUser = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            history.push( '/profile/' + value );
            dispatch(setUserTC(value))
        }

    }



    return (
        <div className={style.header}>
            <div className={style.nav}>
                <div><img src={ims}/></div>
                <div><input value={value} onKeyPress={findUser} onChange={onChangeValue}/></div>
             {/*<NavLink onClick={findUser} to={'/profile/' + value}>Login</NavLink>*/}


            </div>

        </div>
    );
}

export default Header;

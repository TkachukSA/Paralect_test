import React, {ChangeEvent, useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import style from './Header.module.css'
import ims from './Vector.svg'
import {useDispatch, useSelector} from "react-redux";
import {setUserTC} from "../redux/reducers/profile-reducer";
import {AppRootStateType} from "../redux/store/store";
import {UserResponseType} from "../api/api";



function Header() {
    const isFound = useSelector<AppRootStateType, boolean>(state => state.profile.userNotFound)
    const user = useSelector<AppRootStateType, UserResponseType>(state => state.profile.user)
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    useEffect(()=>{
        if(isFound){
            alert('не найден')
        }if(!isFound){
            alert('найден')
        }
    },[ isFound])

    const findUser =  () => {
        dispatch(setUserTC(value))
        debugger

    }



    return (
        <div className={style.header}>
            <div className={style.nav}>
                <div><img src={ims}/></div>
                <div><input value={value} onChange={onChangeValue}/></div>
             <NavLink onClick={findUser} to={'/profile/' + value}>Login</NavLink>
            {/* <button onClick={findUser}/>*/}

            </div>

        </div>
    );
}

export default Header;

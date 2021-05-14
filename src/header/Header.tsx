import React, {ChangeEvent, useState} from 'react';
import {NavLink, Redirect, Switch, useParams} from 'react-router-dom';
import style from './Header.module.css'
import ims from './Vector.svg'
import {useDispatch} from "react-redux";
import {setUserTC} from "../redux/reducers/profile-reducer";
import {PATH} from "../App";


function Header() {

    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const findUser = () => {
        dispatch(setUserTC(value))
    }


    return (
        <div className={style.header}>
            <div className={style.nav}>
                <div><img src={ims}/></div>
                <div><input value={value} onChange={onChangeValue}/></div>

                {/*<NavLink to={'/profile/' + value}>{<button onClick={findUser}>ok</button>}</NavLink>*/}
             <NavLink onClick={findUser} to={'/profile/' + value}>Login</NavLink>


            </div>

        </div>
    );
}

export default Header;

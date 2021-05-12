import React from 'react';
import {NavLink, Switch} from 'react-router-dom';
import style from './Header.module.css'

export const PATH = {
    loginPage: "/login",
    RecoveryPasswordPage: "/recoverypassword",
    NewPasswordPage: "/newpassword/:token?",
    RegistrationPage: "/registration",
    PreJuniorPage: "/prejunior",
    ErrorPage: "/404",
    Main: "/",
    Redirect: "*",
    Packs: "/packs",
    Cards: "/cards/"

    // add paths
}

function Header() {

    return (
        <div className={style.header}>
            <Switch>
                <div className={style.nav}>
                    <ul>
                        <li><NavLink to={PATH.loginPage}>Login</NavLink></li>
                        <li><NavLink to={PATH.RecoveryPasswordPage}>Reacovery Password</NavLink></li>
                        <li><NavLink to={PATH.NewPasswordPage}>New Password</NavLink></li>
                        <li><NavLink to={PATH.RegistrationPage}>Registration</NavLink></li>
                        <li><NavLink to={PATH.PreJuniorPage}>PreJunior</NavLink></li>
                        <li><NavLink to={PATH.Main}>Profile</NavLink></li>
                        <li><NavLink to={PATH.ErrorPage}>Error Page</NavLink></li>
                        <li><NavLink to={PATH.Packs}>Packs</NavLink></li>
                        <li><NavLink to={PATH.Cards}>Cards</NavLink></li>
                    </ul>
                </div>
            </Switch>
        </div>
    );
}

export default Header;

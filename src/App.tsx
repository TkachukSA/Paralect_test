import React from 'react';
import './App.css';
import {Header} from "./ui/header/Header";
import {InitialState} from "./ui/initialState/InitialState";
import {Profile} from "./ui/profile/Profile";
import {Redirect, Route, Switch} from 'react-router-dom';

export const PATH = {
    profilePage: "/profile/:userId?",
    initialState: "/",
    error: '/404',
    redirect: '*'
    // add paths
}

function App() {

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path={PATH.initialState} render={() => <InitialState/>}/>
                <Route path={PATH.profilePage} render={() => <Profile/>}/>
                <Route path={PATH.error} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                <Redirect from={PATH.redirect} to={PATH.error}/>
            </Switch>
        </div>
    );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./header/Header";
import InitialStateContainer from "./InitialState";

function App() {
  return (
    <div className="App">
    <Header/>
    <InitialStateContainer/>
    </div>
  );
}

export default App;

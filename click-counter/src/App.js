import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function App({ handleClick}) {
  
    return (
      <div >This div has been clicked times.
        <button onClick={() => {handleClick('A'); }}>A</button>
        <button onClick={() => {handleClick('B'); }}>B</button>
        <button onClick={() => {handleClick('C'); }}>C</button>
      </div>
    );
  }


export default App;

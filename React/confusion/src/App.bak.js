import React, {Component} from 'react';
import Header from './components/Header.js'
import HeaderHome from './components/Header-home.js'
import LoginManual from './components/Login.js'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
// import HeaderHome from './components/Header-home.js';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderHome/>
          <LoginManual>
          </LoginManual>
      </div>
    );
  }
}

export default App;

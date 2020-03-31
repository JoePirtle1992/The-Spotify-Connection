import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Spotify from './components/Spotify'
import Login from './components/Login'
import SeeProfile from './components/SeeProfile';
import Playlist from './components/Playlist';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/spotify" exact>
          <Spotify/>
        </Route>
        <Route path="/playlist/:id/:more" component={Playlist} exact></Route>
        <Route path="/" exact>
          <Login/>
          </Route>
          <Route path="/profile" exact>
            <SeeProfile/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;

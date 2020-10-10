import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Home from './page/Home';
import MusicList from './page/MusicList';
import iheart from './iheart.png';

const StyledHr = styled.hr`
  height: 2px;
  border-width: 0;
  color: #C0C0C0;
  background-color: #C0C0C0  
`
const App = () => {
  return (
    <div>
      <Router>
        <div>
            <ul>
              <li>
                <img src={iheart}></img>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/music">Music</Link>
              </li>
            </ul>
          <StyledHr/>
          <Switch>
            <Route path="/music">
              <MusicList/>
            </Route>
            <Route exact path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

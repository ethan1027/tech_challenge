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

const StyledHr = styled.hr`
  height: 2px;
  border-width: 0;
  color: #C0C0C0;
  background-color: #C0C0C0  
`

const InLi= styled.ul`
  display: inline;
`

const App = () => {
  return (
    <div>
      <Router>
        <div>
            <ul>
              <InLi>
                <Link to="/">Home</Link>
              </InLi>
              <InLi>
                <Link to="/music">Music</Link>
              </InLi>
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

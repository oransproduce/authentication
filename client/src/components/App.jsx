import React from 'react';
import {
  BrowserRouter, Link, Route, Switch,
} from 'react-router-dom';
import Public from './Public';
import Protected from './Protected';

export default function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/public">public</Link>
        </li>
        <li>
          <Link to="/protected">protected</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/public">
          <Public />
        </Route>
        <Route path="/protected">
          <Protected />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

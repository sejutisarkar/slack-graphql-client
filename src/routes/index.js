import React , {Component} from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Home from './home';
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
    </Switch>
  </BrowserRouter>
);

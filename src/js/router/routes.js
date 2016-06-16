// Modules
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import App      from '../components/App.react';
import Library  from '../components/Library/Library.react';
import Settings from '../components/Settings/Settings.react';
import Torrents from '../components/Torrents/Torrents.react';


// Router
var routes = (
    <Route component={ App } path='/'>
        <Route path='/library'  component={ Library } />
        <Route path='/settings' component={ Settings } />
        <Route path='/torrents' component={ Torrents } />
    </Route>
);

export default routes;

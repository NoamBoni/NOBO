import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

const App = () => {
    return (
        <Switch>
            <Route path='/'>
                <HomePage />
            </Route>
        </Switch>
    );
};

export default App;

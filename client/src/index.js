import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './style/index.scss';
import App from './App.jsx';
import Theme from './style/Theme';

const Main = () => {
    return (
        <BrowserRouter>
            <Theme>
                <App />
            </Theme>
        </BrowserRouter>
    );
};

ReactDOM.render(<Main />, document.getElementById('root'));

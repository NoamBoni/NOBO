import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';

import './style/index.scss';
import App from './App.jsx';
import Theme from './style/Theme';

const Main = () => {
    return (
        <IconContext.Provider value={{}}>
            <BrowserRouter>
                <Theme>
                    <App />
                </Theme>
            </BrowserRouter>
        </IconContext.Provider>
    );
};

ReactDOM.render(<Main />, document.getElementById('root'));
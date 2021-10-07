import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { QueryClient, QueryClientProvider } from 'react-query';

import './style/index.scss';
import App from './App.jsx';
import Theme from './style/Theme';

const queryClient = new QueryClient();

const Main = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <IconContext.Provider value={{}}>
                <BrowserRouter>
                    <Theme>
                        <App />
                    </Theme>
                </BrowserRouter>
            </IconContext.Provider>
        </QueryClientProvider>
    );
};

ReactDOM.render(<Main />, document.getElementById('root'));

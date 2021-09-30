import React from 'react';

import Header from './Header';
import About from './About';

const HomePage = props => {
    return (
        <>
            <Header />
            <main>
                <About />
            </main>
        </>
    );
};

export default HomePage;

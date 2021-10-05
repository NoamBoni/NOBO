import React from 'react';

import Header from './Header';
import About from './About';
import Features from './Features';

const HomePage = props => {
    return (
        <>
            <Header />
            <main>
                <About />
                <Features />
            </main>
        </>
    );
};

export default HomePage;

import React from 'react';

import Header from './Header';
import About from './About';
import Features from './Features';
import Tours from './Tours';

export default function HomePage(props) {
    return (
        <>
            <Header />
            <main>
                <About />
                <Features />
                <Tours />
            </main>
        </>
    );
}

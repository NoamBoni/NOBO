import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
    primaryColorLight: '#7ed56f',
    primaryColor: '#55c57a',
    primaryColorDark: '#28b485',
    lightGrey1: '#f7f7f7',
    darkGrey: '#777',
    white: '#fff',
    black: '#000',
    shadow: 'rgba(0,0,0,.2)',
    dfltFontSize:'1.2rem'
};

export default function Theme(props) {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

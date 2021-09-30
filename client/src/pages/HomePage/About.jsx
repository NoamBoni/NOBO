import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
    background-color: ${({ theme }) => theme.lightGrey1};
    padding: 25rem 0;
    margin-top: -20vh;
    text-align: center;

    h2 {
        display: inline-block;
        font-size: 2.5rem;
        text-transform: uppercase;
        font-weight: 700;
        background-image: linear-gradient(
            to right,
            ${({ theme }) => theme.primaryColorLight},
            ${({ theme }) => theme.primaryColorDark}
        );
        letter-spacing: 0.2rem;
        transition: all 0.2s;
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom:8rem;

        &:hover {
            transform: skewY(1deg) skewX(7deg) scale(0.9);
            text-shadow: 0.5rem 1rem 2rem ${({ theme }) => theme.shadow};
        }
    }
`;

const About = () => {
    return (
        <Section>
            <h2>Exciting tours for adventurous people</h2>
        </Section>
    );
};

export default About;

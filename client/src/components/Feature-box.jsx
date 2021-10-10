import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    height: 35%;
    padding: 3rem 1.5rem;
    border-radius: 3px;
    line-height: 1.4;
    transition: all .2s;

    &:hover {
        transform: translateY(-1rem) scale(1.05);
    }

    h3 {
        margin-bottom: 1.6rem;
        text-transform: uppercase;
    }
`;

//props: title paragraph icon
export default function FeatureBox(props) {
    return (
        <Container>
            {props.icon}
            <h3>{props.title}</h3>
            <p>{props.paragraph}</p>
        </Container>
    );
}

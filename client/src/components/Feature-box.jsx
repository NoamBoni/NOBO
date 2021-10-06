import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    height: 35%;
    padding: 1.6rem 1rem;
    border-radius: 3px;
    line-height: 1.4;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-1rem) scale(1.05);
    }

    h3 {
        margin-bottom: 0.9rem;
        text-transform: capitalize;
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

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: 2px solid black;
`;

export default function TourBox(props) {
    return (
        <Container>
            <h1>TOURs</h1>
            <p>BOX</p>
        </Container>
    );
}

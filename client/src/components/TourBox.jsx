import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    font-size: 2rem;

    div {
        transition: all 0.6s;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        backface-visibility: hidden;
        border-radius: 3px;
        box-shadow: 0 1rem 4rem ${({ theme }) => theme.shadow};
    }

    .front {
        background-color: ${({ theme }) => theme.white};
    }

    .back {
        background-image: linear-gradient(
            to bottom right,
            ${({ theme }) => theme.primaryColorLight},
            ${({ theme }) => theme.primaryColor}
        );
        transform: rotateY(180deg);
    }

    &:hover .front {
        transform: rotateY(-180deg);
    }

    &:hover .back {
        transform: rotateY(0);
    }
`;

export default function TourBox(props) {
    return (
        <Container>
            <div className='front'>
                <div className="picture"></div>
                <div className="heading"></div>
                <div className="details"></div>
            </div>
            <div className='back'>{props.name}</div>
        </Container>
    );
}

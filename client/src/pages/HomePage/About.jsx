import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import nat1 from '../../images/nat-1-large.jpg';
import nat2 from '../../images/nat-2-large.jpg';
import nat3 from '../../images/nat-3-large.jpg';
import {
    green_background_title,
    grey_shape_background,
} from '../../style/Mixins';

const Section = styled.section`
    ${grey_shape_background()}
    ${green_background_title(5,0.2)}
`;

const Container = styled.div`
    display: grid;
    grid-template-rows:45vh;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;

    div {
        padding: 0 4.5rem;
    }

    .info {
        align-items: center;
        grid-row: 1/2;
        grid-column: 1/2;
        text-align: left;
        font-size: ${({ theme }) => theme.dfltFontSize};

        h3 {
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 0.6rem;
        }

        p {
            font-weight: 400;

            &:not(:last-child) {
                margin-bottom: 4.5rem;
            }
        }
    }

    .pics {
        grid-row: 1/2;
        grid-column: 2/3;
        position: relative;

        img {
            width: 45%;
            box-shadow: 0 2rem 4rem ${({ theme }) => theme.shadow};
            position: absolute;
            transition: all 0.2s;

            &:hover {
                z-index: 5;
                transform: scale(1.05);
                outline-offset: 1.5rem;
                outline: 1.5rem solid ${({ theme }) => theme.primaryColorDark};
            }
        }

        .pic1 {
            top: 0%;
            left: 4%;
        }

        .pic2 {
            top: 12%;
            left: 44%;
        }

        .pic3 {
            top: 42%;
            left: 20%;
        }
    }
`;

const NvgLink = styled(Link)`
    color: ${({ theme }) => theme.primaryColor};
    display: inline-block;
    text-decoration: none;
    padding: .7rem;
    border-bottom: 1px solid ${({ theme }) => theme.primaryColor};
    font-size: ${({ theme }) => theme.dfltFontSize};
    transition: all .3s;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 1rem 2rem ${({ theme }) => theme.shadow};
        color: ${({ theme }) => theme.white};
        background-color: ${({ theme }) => theme.primaryColor};
        border-radius: 0.5rem;
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px ${({ theme }) => theme.shadow};
    }
`;

export default function About() {
    return (
        <Section>
            <h2>Exciting tours for adventurous people</h2>
            <Container>
                {/* TODO remove placeholders */}
                <div className='info'>
                    <h3>You're going to fall in love with nature</h3>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Reprehenderit tenetur libero iste in dignissimos
                        inventore ducimus sunt tempore, nam aut deserunt esse
                        mollitia impedit quis, natus perspiciatis debitis. Quae,
                        hic!
                    </p>
                    <h3>Live adventurous like never before</h3>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Reprehenderit tenetur libero iste in dignissimos
                        inventore ducimus sunt tempore, nam aut deserunt esse
                    </p>
                    {/* TODO add a link */}
                    <NvgLink to='/'>Learn More &rarr;</NvgLink>
                </div>
                <div className='pics'>
                    <img className='pic1' src={nat1} alt='pic1' />
                    <img className='pic2' src={nat2} alt='pic2' />
                    <img className='pic3' src={nat3} alt='pic3' />
                </div>
            </Container>
        </Section>
    );
}

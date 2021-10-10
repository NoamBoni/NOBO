import React from 'react';

import { moveInLeft, moveInRight } from '../../style/keyframes';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { btn_white, green_background_photo } from '../../style/Mixins';
import backpic from '../../images/hero.jpg';
import logo from '../../images/logo-white.png';

const Top = styled.header`
    position: relative;
    height: 95vh;
    ${green_background_photo(backpic)}
    clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);

    .logo {
        position: absolute;
        top: 4rem;
        left: 4rem;

        img {
            height: 3.5rem;
        }
    }

    .center {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        h1 {
            color: ${({ theme }) => theme.white};
            text-transform: uppercase;
            margin-bottom: 6rem;
            
            span {
                backface-visibility: hidden;
                display: block;
                animation-duration: 1s;
                animation-timing-function: ease-out;
            }

            span:first-child {
                font-size: 6rem;
                font-weight: 400;
                letter-spacing: 3rem;
                animation-name: ${moveInLeft};
            }

            span:last-child {
                font-size: ${({ theme }) => theme.dfltFontSize};
                font-weight: 700;
                letter-spacing: 1.55rem;
                animation-name: ${moveInRight};
                transform: translatex(-0.8rem);
            }
        }
    }
`;

const NvgLink = styled(Link)`
    ${btn_white()}
    text-transform: uppercase;
    padding: 1.5rem 3.5rem;
    text-decoration: none;
    display: inline-block;
    border-radius: 100px;
    transition: all 0.2s;
    position: relative;
    font-size: ${({ theme }) => theme.dfltFontSize};

    &:hover {
        transform: translateY(-3px) scale(1.2);
        box-shadow: 0 1rem 2rem ${({ theme }) => theme.shadow};
    }

    &:active {
        transform: translateY(-1px) scale(1.1);
        box-shadow: 0 0.5rem 0.1rem ${({ theme }) => theme.shadow};
    }
`;

export default function Header() {
    return (
        <Top>
            <div className='logo'>
                <img src={logo} alt='logo' />
            </div>
            <div className='center'>
                <h1>
                    <span>Outdoors</span>
                    <span>Is where life happens</span>
                </h1>
                <NvgLink to={'/' /*TODO add a link*/}>
                    discover our tours
                </NvgLink>
            </div>
        </Top>
    );
}

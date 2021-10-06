import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { btn_white,green_background_photo } from '../../style/Mixins';
import backpic from '../../images/hero.jpg';
import logo from '../../images/logo-white.png';

const Top = styled.header`
    position: relative;
    height: 95vh;
    ${green_background_photo(backpic)}
    clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);

    .logo {
        position: absolute;
        top: 40px;
        left: 40px;

        img {
            height: 35px;
        }
    }

    .center {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        h1 {
            color: ${({theme})=>theme.white};
            text-transform: uppercase;
            backface-visibility: hidden;
            margin-bottom: 60px;

            span {
                display: block;
                animation-duration: 1s;
                animation-timing-function: ease-out;
            }

            span:first-child {
                font-size: 4rem;
                font-weight: 400;
                letter-spacing: 35px;
                animation-name: moveInLeft;
            }

            span:last-child {
                font-size: 1.5rem;
                font-weight: 700;
                letter-spacing: 15.8px;
                animation-name: moveInRight;
            }
        }
    }
`;

const NvgLink = styled(Link)`
    ${btn_white()}
    text-transform: uppercase;
    padding: 15px 40px;
    text-decoration: none;
    display: inline-block;
    border-radius: 100px;
    transition: all 0.2s;
    position: relative;

    &:hover {
        transform: translateY(-3px) scale(1.2);
        box-shadow: 0 10px 20px ${({ theme }) => theme.shadow};
    }

    &:active {
        transform: translateY(-1px) scale(1.1);
        box-shadow: 0 5px 10px ${({ theme }) => theme.shadow};
    }
`;

export default function Header(){
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
};

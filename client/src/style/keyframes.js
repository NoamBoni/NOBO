import { keyframes } from 'styled-components';

export const moveInLeft = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-10rem);
    }
    80% {
        transform: translateX(2rem);
    }
    100% {
        opacity: 1;
        transform: translate(0);
    }
`;

export const moveInRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(10rem);
    }
    80% {
        transform: translateX(-2rem);
    }
    100% {
        opacity: 1;
        transform: translate(0);
    }`;

export const loading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }`;

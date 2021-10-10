import { css } from 'styled-components';

export const btn_white = () => css`
    color: #777;
    background-color: #fff;
`;

export const green_background_photo = picture => css`
    background-image: linear-gradient(
            to right bottom,
            rgba(126, 213, 111, 0.8),
            rgba(40, 180, 131, 0.8)
        ),
        url(${picture});
    background-size: cover;
    background-position: top;
`;

export const green_background_title = (margin, space) => css`
    h2 {
        display: block;
        background-image: linear-gradient(
            to right,
            ${({ theme }) => theme.primaryColorLight},
            ${({ theme }) => theme.primaryColorDark}
        );
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        font-size: 3rem;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: ${space}rem;
        margin-bottom: ${margin}rem;
    }
`;

export const grey_shape_background = () => css`
    background-color: ${({ theme }) => theme.lightGrey1};
    padding: 30vh 0;
    margin-top: -20vh;
    text-align: center;
`;

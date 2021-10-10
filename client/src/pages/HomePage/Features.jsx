import React from 'react';
import styled from 'styled-components';
import { FiGlobe, FiSun, FiMap, FiHeart } from 'react-icons/fi';

import FeatureBox from '../../components/Feature-box';
import backpic from '../../images/nat-4.jpg';
import { green_background_photo } from '../../style/Mixins';

const features = [
    /* TODO replace placeholders */
    {
        Icon: FiGlobe,
        title: 'explore the world',
        paragraph: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    },
    {
        Icon: FiSun,
        title: 'meet nature',
        paragraph: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    },
    {
        Icon: FiMap,
        title: 'find your way',
        paragraph: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    },
    {
        Icon: FiHeart,
        title: 'live a healthier life',
        paragraph: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    },
];

const Section = styled.section`
    display: grid;
    padding: 0 9rem;
    grid-template-rows: 100vh;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5rem;
    align-items: center;
    margin-top: -20vh;
    ${green_background_photo(backpic)}
    clip-path: polygon(0 20vh, 100% 0, 100% 80vh, 0 100%);
    text-align: center;
    font-size: ${({ theme }) => theme.dfltFontSize};

    svg {
        margin-bottom: 1.5rem;
        font-size: 4.5rem;
        color: ${({ theme }) => theme.primaryColor};
    }
`;

export default function Features() {
    return (
        <Section>
            {features.map(({ Icon, title, paragraph }) => (
                <FeatureBox
                    key={title}
                    icon={<Icon strokeWidth='1.2px' />}
                    title={title}
                    paragraph={paragraph}
                />
            ))}
        </Section>
    );
}

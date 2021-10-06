import React from 'react';
import styled from 'styled-components';

import {
    green_background_title,
    grey_shape_background,
} from '../../style/Mixins';
import TourBox from '../../components/TourBox';

const Section = styled.section`
    text-align: center;
    ${grey_shape_background()}
    ${green_background_title(3, 0.1)}
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 65vh;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 4rem;
    padding: 0 9rem;
`;

export default function Tours(props) {
    return (
        <Section>
            <h2>most popular tours</h2>
            <Wrapper>
                <TourBox />
                <TourBox />
                <TourBox />
            </Wrapper>
        </Section>
    );
}

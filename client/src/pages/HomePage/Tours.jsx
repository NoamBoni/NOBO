import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import {
    green_background_title,
    grey_shape_background,
} from '../../style/Mixins';
import TourBox from '../../components/TourBox';
import api from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';

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

const getTop3 = async () => {
    const axRes = await api.get('tours?limit=3&sort=-ratingsAverage');
    const res = await axRes.data;
    return res.data;
};

export default function Tours(props) {
    const { data, error, isLoading, isError } = useQuery('top3', getTop3);
    
    if (isLoading) return <LoadingSpinner />;
    
    // TODO update error
    if (isError) return <h1>{error}</h1>
    return (
        <Section>
            <h2>our most loved tours</h2>
            <Wrapper>
                {data.map(tour => (
                    <TourBox
                        price={tour.price}
                        duration={tour.duration}
                        name={tour.name}
                        maxGroupSize={tour.maxGroupSize}
                        guides={tour.guides.length}
                        difficulty={tour.difficulty}
                        image={tour.imageCover}
                    />
                ))}
            </Wrapper>
        </Section>
    );
}

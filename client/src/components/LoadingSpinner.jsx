import styled from 'styled-components';

import { loading } from '../style/keyframes';

export default styled.div`
    border: 0.7rem solid #f3f3f3;
    border-top: 0.7rem solid ${({ theme }) => theme.primaryColorDark};
    border-right: 0.7rem solid ${({ theme }) => theme.primaryColor};
    border-bottom: 0.7rem solid ${({ theme }) => theme.primaryColorLight};
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    animation: ${loading} 2s linear infinite;
    margin: 3rem auto;
`;

import styled from 'styled-components';

export default styled.div`
    border: .4rem solid #f3f3f3; 
    border-top: .4rem solid ${({theme})=>theme.primaryColorDark}; 
    border-right: .4rem solid ${({theme})=>theme.primaryColor}; 
    border-bottom: .4rem solid ${({theme})=>theme.primaryColorLight}; 
    border-radius: 50%;
    width:2.5rem;
    height: 2.5rem;
    animation: loading 2s linear infinite;
`;
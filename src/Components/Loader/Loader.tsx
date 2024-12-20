
import React from 'react';
import styled, { keyframes } from 'styled-components';


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;


const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
  font-size: 1.5rem;
  color: #333; 
`;


const Spinner = styled.div`
  border: 8px solid #f3f3f3; 
  border-top: 8px solid black; 
  border-radius: 50%;
  width: 50px; 
  height: 50px; 
  animation: ${spin} 1s linear infinite;
`;

// Loader component
const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

export default Loader;

import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #f8f9fa; 
  padding: 10px 0;
  text-align: center; 
  position: relative; 
  bottom: 0; 
  width: 100%;
  font-size: 14px; 
  color: #333; 
  border-top: 1px solid rgb(199, 199, 199);
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <p>&copy; {new Date().getFullYear()} E-Shopping. All rights reserved.</p>
    </StyledFooter>
  );
};

export default Footer;

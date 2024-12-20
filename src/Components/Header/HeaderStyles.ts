// HeaderStyles.ts
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  z-index: 100;
  gap: 2rem;
  position: sticky;
  width: 100%;
  top: 0;
  align-items: center;
  color: rgb(1, 1, 48);
  padding: 0.5rem 2rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.div`
  a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    font-size: 1.5rem;
    font-family: cursive;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;


  
  a {
    color: rgb(1, 1, 48);
    text-decoration: none;
    font-weight: 500;
    font-size: 15px;
  }

  a:hover {
    color: rgb(0, 0, 133);
  }

  
`;

export const Dropdown = styled.div`
  position: relative; 
`;

export const DropdownToggle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  &:hover {
    color: rgb(0, 0, 133);
  }
`;

export const DropdownMenu = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 200; 
  min-width: 220px;
  right: 0.5rem;

  a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  a:hover {
    background-color: #f1f1f1;
  }
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  font-size: 30px;
  color: rgb(1, 1, 48);
  display: none;
  
`;

import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';

export const BlogsContainer = styled.main`
  h1 {
    text-align: center;
    margin-bottom: 3rem;
    margin-top: 2rem;
  }


  .pagination {
    display: flex;
    list-style: none;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination a {
    padding: 8px 12px;
    cursor: pointer;
    color: #333;
    border: 1px solid #ddd;
  }

  .pagination .active a {
    background-color: #333;
    color: #fff;
  }

  .pagination a:hover {
    background-color: #333;
    color: #fff;
  }



`;

export const BlogItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0.2, 0.2, 0, 0.2);
    border: 1px solid rgb(1, 1, 48);
  }
`;

export const BlogItemTop = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

export const BlogImage = styled.img`
  border-radius: 1rem;
  width: 30vw;
  height: 30vh;
  object-fit: cover;

  @media(max-width: 500px){
  width: 60vw;
  height: 60vh;
  }

  @media(max-width: 500px){
  width: 30vw;
  height: 30vh;
  }

`;

export const BlogItemRight = styled.div`
  overflow: hidden;
  height: 8rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    text-align: justify;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    text-overflow: ellipsis;
  }

  @media(max-width: 350px){
  -webkit-line-clamp: 1;
  height: 9rem;

    p {
    -webkit-line-clamp: 1;
  }
  }
`;

export const BlogItemFooter = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const BlogItemFooterUser = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const UserIcon = styled(FaUserCircle)`
  font-size: 2rem;
`;

export const Pagination = styled.ul`
  display: flex;
  list-style: none;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

// Pagination links
export const PaginationLink = styled.a`
  padding: 8px 12px;
  cursor: pointer;
  color: #333;
  border: 1px solid #ddd;

  &.active {
    background-color: #333;
    color: #fff;
  }

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export const BlogsContent = styled.div`
margin-top: 5rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
  flex-wrap:wrap;
  gap: 0.5rem;

  input,
  select {
    width: 10rem;
    height: 2rem;
  }
  }

`;



export const StyledInput = styled.input`
  width: 100%!important;
      padding: 10px 40px 10px 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
      text-align: left;
`;

export const StyledSelect = styled.select`
  width: 10rem;
  height: 2rem;
  padding: 0.5rem; 
`;


export const SearchContainer = styled.div`
  position: relative;
    width: 320px;
    border: 1px solid black;

    @media(max-width: 400px){
    width: 160px;
    }
`;

export const StyledSearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
  font-size: 18px;
`;



export const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;
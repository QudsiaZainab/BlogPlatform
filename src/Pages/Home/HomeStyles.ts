
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

export const HeroSection = styled.section`
  background: url('lightbulb-glowing-book-dark-background-creative-thinking-idea-after-reading-study-concept_50039-3061.avif');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeroContent = styled.div`
  width: fit-content;
  background: rgba(16, 16, 16, 0.9);
  padding: 1rem;
  color: white;
  border-radius: 5px;
  text-align: center;

  h1 {
    font-size: 3rem;
  }

  p {
    font-size: 2rem;
  }

  @media (max-width: 780px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export const Main = styled.main`
  padding: 1rem 3rem;
`;

export const CategoryList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 1.5rem;
`;

export const CategoryBox = styled.div`
  width: fit-content;
  padding: 1rem;
  box-shadow: 0px 4px 8px rgba(0.2, 0, 0, 0.2);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid rgb(1, 1, 48);
  }

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
`;

export const BlogsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 1rem;
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

  img {
    border-radius: 1rem;
    width: 30vw;
    height: 30vh;
    object-fit: cover;
  }

  @media (max-width: 780px) {
    flex-direction: column;
  }

  @media (max-width: 500px) {
    img {
      width: 60vw;
    }
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
`;

export const BlogItemFooter = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const BlogItemFooterUser = styled.p`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const UserIcon = styled(FaUserCircle)`
  font-size: 2rem;
`;
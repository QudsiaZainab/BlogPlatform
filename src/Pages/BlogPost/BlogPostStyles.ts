import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

export const Cat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width:500px){
  h1{font-size: 1.2rem}
  
  }
`;

export const BlogContent = styled.p`
  text-align: justify;
  line-height: 1.5rem;
`;

export const AboutBlogPost = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;

  @media (max-width: 350px){
   flex-direction: column;
   gap: 0.2rem;
  }
`;

export const BlogDetail = styled.main`
  
  h1 {
    margin-top: 2rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  img {
    width: 100%;
    height: 25rem;
    margin-bottom: 1rem;
  }

 



  @media (max-width: 350px) {
    .about-user-comment {
      flex-direction: column;
    }
  }
`;

export const Title = styled.h1`
  margin-top: 2rem;
  margin-bottom: 3rem;
  text-align: center;

  `;

export const Image = styled.img`
  width: 100%;
  height: 25rem;
  margin-bottom: 1rem;
`;

export const CommentsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  box-shadow: 0px 6px 12px rgba(0.1, 0.1, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fff;
  cursor: pointer;

   @media (max-width: 350px) {
    flex-direction: column;
    gap: 0.2rem;
  }
`;

export const CommentContent = styled.p`
  padding-left: 3.5rem;
  margin-bottom: -2rem;


`;

export const UserComment = styled.div`
  display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgb(136, 135, 135);
    font-size: 0.7rem;
  
 
`;

export const UserName = styled.span`
  margin-top: 0.2rem;
`;

export const UserIcon = styled(FaUserCircle)`
  font-size: 2rem;
  margin-right: 0.5rem; 
  margin-top: -0.8rem;
`;


export const CommentUserName = styled.span`
  margin-top: 0.2rem;
  margin-left: -0.5rem;
`;
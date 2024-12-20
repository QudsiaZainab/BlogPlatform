import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBlogs } from '../../Features/BlogsSlice';
import { FaUserCircle } from 'react-icons/fa';
import { BlogDetail, Cat, BlogContent, AboutBlogPost, CommentsContainer, CommentContent, Comment, UserComment, UserIcon, CommentUserName} from './BlogPostStyles';
import { CategoryTag } from '../../MainStyle/Style';


export const BlogPost: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const blogs = useSelector(selectBlogs);

  const blog = blogs.find((b) => b.id === Number(blogId));

  if (!blog) return <p>Blog not found.</p>;

  return (
    <BlogDetail>
      <Cat>
        <h1>{blog.title}</h1>
        <CategoryTag>{blog.category.Name}</CategoryTag>
      </Cat>
      <img src={`http://localhost:1337${blog.Image.formats.thumbnail.url}`} alt={blog.title} />
      <BlogContent>{blog.content}</BlogContent>

      <AboutBlogPost>
        <p><b>Author: </b>{blog.users_permissions_user.username}</p>
        <p><b>Published Date: </b>{blog.createdAt}</p>
      </AboutBlogPost>

      <h3>Comments</h3>
      {blog.comments.length > 0 ? (
        <CommentsContainer>
          {blog.comments.map((comment) => (
            <div key={comment.createdAt} >
              <CommentContent >{comment.Content}</CommentContent>
              <Comment >
                <UserComment ><UserIcon /> <CommentUserName>{comment.users_permissions_user?.username || 'Anonymous'}</CommentUserName></UserComment>
                <p>{new Date(comment.createdAt).toLocaleDateString('en-GB')}</p>
              </Comment>

            </div>
          ))}
        </CommentsContainer>
      ) : (
        <p>No comments yet.</p>
      )}
    </BlogDetail>
  );
};

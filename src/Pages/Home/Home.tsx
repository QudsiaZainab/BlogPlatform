import React, { useEffect } from 'react';
import { fetchCategories } from '../../Features/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/Store';
import Loader from '../../Components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { fetchAllBlogs, selectBlogs } from '../../Features/BlogsSlice';
import {
  HeroSection, HeroContent, Main, CategoryList, CategoryBox,
  BlogsContent, BlogItem, BlogItemTop, BlogItemRight,
  BlogItemFooter, BlogItemFooterUser, UserIcon,
} from './HomeStyles';
import { Cat, CategoryTag } from '../../MainStyle/Style';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector((state: RootState) => state.categories);
  const blogs = useSelector(selectBlogs);

  useEffect(() => {
    dispatch(fetchAllBlogs());
    dispatch(fetchCategories());
  }, [dispatch]);
  

  const sortedBlogs = () => {
    return [...blogs]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  };

  return (
    <div>
      <HeroSection style={{backgroundImage: `url('lightbulb-glowing-book-dark-background-creative-thinking-idea-after-reading-study-concept_50039-3061.avif')`}}>
        <HeroContent>
          <h1>Join Our Community of Readers</h1>
          <p>Explore diverse topics and expand your horizons with every read.</p>
        </HeroContent>
      </HeroSection>
      <Main>
        <h1>Categories</h1>
        {loading && <Loader />}
        {error && <p>Error fetching categories: {error}</p>}
        {categories.length > 0 ? (
          <CategoryList>
            {categories.slice(0, 7).map((category) => (
              <CategoryBox
                key={category.id}
                onClick={() => { navigate(`/blogs/${category.id}`); }}
              >
                <img
                  src={`http://localhost:1337${category.Image.formats?.thumbnail?.url || category.Image.url}`}
                  alt={category.Name}
                />
                <h5>{category.Name}</h5>
              </CategoryBox>
            ))}
          </CategoryList>
        ) : (
          <p>No categories available.</p>
        )}

        <h1>Top Blogs</h1>
        <BlogsContent>
          {sortedBlogs().length > 0 ? (
            sortedBlogs().map((blog) => (
              <BlogItem key={blog.id} onClick={() => { navigate(`/blogs/blog/${blog.id}`); }}>
                <BlogItemTop>
                  <div>
                    <img src={`http://localhost:1337${blog.Image.formats.thumbnail.url}`} alt={blog.title} />
                  </div>
                  <BlogItemRight>
                  <Cat>
                    <h3>{blog.title}</h3>
                    <CategoryTag>{blog.category.Name}</CategoryTag>
                  </Cat>
                    <p>{blog.content}</p>
                  </BlogItemRight>
                </BlogItemTop>
                <BlogItemFooter>
                  <BlogItemFooterUser><UserIcon />{blog.users_permissions_user.username}</BlogItemFooterUser>
                  <p>{blog.createdAt}</p>
                </BlogItemFooter>
              </BlogItem>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </BlogsContent>
      </Main>
    </div>
  );
};
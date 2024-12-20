import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBlogs, selectBlogs, selectLoading, selectError } from '../../Features/BlogsSlice';
import { AppDispatch } from '../../Store/Store';
import { fetchCategories, selectCategories } from '../../Features/CategorySlice';
import Loader from '../../Components/Loader/Loader';
import {  FaUserCircle } from 'react-icons/fa';
import { BlogImage, BlogItem, BlogItemFooter, BlogItemFooterUser, BlogItemRight, BlogItemTop, BlogsContainer, BlogsContent, Controls, ControlsRight, SearchContainer, StyledInput, StyledSearchIcon, StyledSelect, UserIcon } from './BlogStyles';
import { CategoryTag, Cat } from '../../MainStyle/Style';


export const Blogs: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const blogs = useSelector(selectBlogs);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAllBlogs());
    dispatch(fetchCategories());
  }, [dispatch]);

  

  const filteredBlogs = categoryId
    ? blogs.filter((blog) => blog.category?.id?.toString() === categoryId)
    : blogs;

  const categoryName = categoryId
    ? filteredBlogs.length > 0
      ? filteredBlogs[0].category.Name
      : ''
    : 'All Blogs'; 

  

  const searchedBlogs = filteredBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBlogs = () => {
    if (sortOrder === 'asc') {
      return searchedBlogs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'desc') {
      return searchedBlogs.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      return searchedBlogs;
    }
  };

  const currentBlogs = sortedBlogs().slice(
    currentPage * blogsPerPage,
    (currentPage + 1) * blogsPerPage
  );

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = event.target.value;
    if (selectedCategoryId) {
      navigate(`/blogs/${selectedCategoryId}`);
    } else {
      navigate('/blogs'); 
    }
  };

  const pageCount = Math.ceil(sortedBlogs().length / blogsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <BlogsContainer>
      <h1>{categoryName}</h1>
      <Controls>
        <div >
          <SearchContainer>
            <StyledInput
              type="text"
              placeholder="Search Blogs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <StyledSearchIcon/>
          </SearchContainer>
        </div>
        <ControlsRight>
        <div>
          <StyledSelect onChange={handleCategoryChange} value={categoryId || ''}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.Name}
              </option>
            ))}
          </StyledSelect>
        </div>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | 'none')}>
            <option value="none">Sort by</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </ControlsRight>
      </Controls>

      <BlogsContent>
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <BlogItem key={blog.id} onClick={() => { navigate(`/blogs/blog/${blog.id}`); }}>
              <BlogItemTop>
                <div >
                  <BlogImage src={`http://localhost:1337${blog.Image.formats.thumbnail.url}`} alt={blog.title} />
                </div>
                <BlogItemRight>
                  <Cat>
                    <h3>{blog.title}</h3>
                    <CategoryTag>{blog.category.Name}</CategoryTag>
                  </Cat>
                  <div>{blog.content}</div>
                </BlogItemRight>
              </BlogItemTop>
              <BlogItemFooter>
                <BlogItemFooterUser>
                  <UserIcon />
                  {blog.users_permissions_user.username}
                </BlogItemFooterUser>
                <div>{blog.createdAt}</div>
              </BlogItemFooter>
            </BlogItem>
          ))
        ) : (
          <div>No blogs found.</div>
        )}
      </BlogsContent>

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </BlogsContainer>
  );
};

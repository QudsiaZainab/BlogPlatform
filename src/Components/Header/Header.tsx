import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { fetchCategories } from '../../Features/CategorySlice';
import { RootState } from '../../Store/Store';
import {
  HeaderContainer,
  Logo,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from './HeaderStyles';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state: RootState) => state.categories);


  const handleDropdownToggle = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    dispatch(fetchCategories() as any);
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location, dispatch]);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  if (location.pathname === '/account') {
    return null;
  }

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">Blogging</Link>
      </Logo>
      <Nav>
        <Link to="/" onClick={() => setDropdownOpen(false)}>Home</Link>

        <Dropdown
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <DropdownToggle
            onClick={handleDropdownToggle}
            aria-expanded={dropdownOpen}
            aria-controls="category-dropdown"
          >
            <Link to='/blogs'>Blogs</Link>
            {dropdownOpen ? (
              <FaChevronUp  />
            ) : (
              <FaChevronDown  />
            )}
          </DropdownToggle>
          <DropdownMenu $show={dropdownOpen}>
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p>{error}</p>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/blogs/${category.id}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  {category.Name}
                </Link>
              ))
            ) : (
              <p>No categories found.</p>
            )}
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </HeaderContainer>
  );
};

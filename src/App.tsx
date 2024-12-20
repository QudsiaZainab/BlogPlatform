// src/App.tsx
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Home } from './Pages/Home/Home';
import { Blogs } from './Pages/Blogs/Blogs';
import { BlogPost } from './Pages/BlogPost/BlogPost';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, hydrateUser } from './Features/AuthSlice';
import { AppDispatch } from './Store/Store';
import Footer from './Components/Footer/Footer';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(hydrateUser());
  }, [dispatch]);

  return (
    <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:categoryId" element={<Blogs />} />
            <Route path="/blogs/blog/:blogId" element={<BlogPost />} />
            <Route path="/account" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      <Footer/>
    </Router>
  );
}

export default App;

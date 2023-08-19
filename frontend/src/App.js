import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import WebFont from 'webfontloader';

import './App.css';
import Home from './pages/Home';
import Category from './pages/Category';
import TopNavBar from './components/TopNavBar';


function App() {
  const allCategories = ["career", "academics", "interpersonal relationships", "personal development"]
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['EB Garamond']
      }
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <TopNavBar categories={allCategories} />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          { allCategories.map((category) => <Route path={`/${category.replaceAll(" ", "-")}`} element={<Category categories={allCategories} category={category} />} key={category} />) }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
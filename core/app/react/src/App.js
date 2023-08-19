import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import WebFont from 'webfontloader';

import Home from './pages/Home';
import Category from './pages/Category';
import TopNavBar from './components/TopNavBar';

function App() {
  const allCategories = ["Career", "Academics", "Interpersonal Relationships", "Personal Development"]
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Times New Roman', 'sans-serif']
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
        <Route
          path="*"
          element={<p>404 not found</p>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
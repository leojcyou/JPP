import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import WebFont from 'webfontloader';

import Home from './pages/Home';
import Category from './pages/Category';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"

import TopNavBar from './components/TopNavBar';

function App() {
  const allCategories = ["career", "academics", "interpersonal relationships", "personal development"]
  
//   <BrowserRouter>
//   <Routes>
//     <Route
//       path="/"
//       element={<Home />}
//     />
//     { allCategories.map((category) => <Route path={`/${category.replaceAll(" ", "-")}`} element={<Category categories={allCategories} category={category} />} key={category} />) }
//   </Routes>
// </BrowserRouter>

  return (
    <div>
    <BrowserRouter>
      <TopNavBar categories={allCategories} />
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          { allCategories.map((category) => <Route path={`/${category.replaceAll(" ", "-")}`} element={<Category categories={allCategories} category={category} />} key={category} />) }
          <Route
            path="*"
            element={<p>404 not found</p>}>
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
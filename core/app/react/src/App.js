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
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Signin />} />
          
          <Route element={<ProtectedRoute/>}>
            <Route path = "/Home" element={<Home />}></Route>
            { allCategories.map((category) => <Route path={`/${category.replaceAll(" ", "-")}`} element={<Category categories={allCategories} category={category} />} key={category} />) }
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
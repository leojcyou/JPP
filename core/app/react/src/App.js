import './App.css';
import Home from './pages/Home';
import Category from './pages/Category';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
    
    <BrowserRouter>
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
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
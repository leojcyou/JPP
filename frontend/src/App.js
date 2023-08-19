import './App.css';
import Home from './pages/Home';
import Category from './pages/Category';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const allCategories = ["career", "academics", "interpersonal relationships", "personal development"]
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        { allCategories.map((category) => <Route path={`/${category.replaceAll(" ", "-")}`} element={<Category category={category} />} key={category} />) }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
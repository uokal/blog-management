import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostForm from './components/PostForm';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<PostForm isCreateMode={true} />} />
      <Route path='/edit/:id' element={<PostForm isCreateMode={false} />} />
    </Routes>
  );
}

export default App;

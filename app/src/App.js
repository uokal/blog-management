import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostForm from './components/PostForm';
import ViewPost from './pages/ViewPost';
import PostList from './components/PostList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<PostForm isCreateMode={true} />} />
      <Route path='/edit/:id' element={<PostForm isCreateMode={false} />} />
      <Route path="/view/:id" element={<ViewPost />} />
      <Route path="/list" element={<PostList />} />


    </Routes>
  );
}

export default App;

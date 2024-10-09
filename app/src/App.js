import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostForm from './pages/PostForm';
import ViewPost from './pages/ViewPost';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/create" element={<PostForm isCreateMode={true} />} />
        <Route path="/edit/:id" element={<PostForm isCreateMode={false} />} />
        <Route path="/view/:id" element={<ViewPost />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

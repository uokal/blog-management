import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast

const API_URL = 'https://blog-management-api-itf8.onrender.com/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
    const response = await axios.post(`${API_URL}/posts`, newPost);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedPost }) => {
    const response = await axios.put(`${API_URL}/posts/${id}`, updatedPost);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await axios.delete(`${API_URL}/posts/${id}`);
    return id;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        currentPost: null, // Add currentPost to the initial state
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.currentPost = action.payload; // Set the current post
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
                toast.success('Post created successfully!'); // Show success message
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex((post) => post._id === action.payload._id);
                state.posts[index] = action.payload;
                toast.success('Post updated successfully!'); // Show success message
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload);
                toast.success('Post deleted successfully!'); // Show success message
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                toast.error('Failed to fetch posts!'); // Show error message
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.currentPost = null; // Reset current post on error
                toast.error('Failed to fetch post!'); // Show error message
            })
            .addCase(createPost.rejected, (state, action) => {
                toast.error('Failed to create post!'); // Show error message
            })
            .addCase(updatePost.rejected, (state, action) => {
                toast.error('Failed to update post!'); // Show error message
            })
            .addCase(deletePost.rejected, (state, action) => {
                toast.error('Failed to delete post!'); // Show error message
            });
    },
});

export default postsSlice.reducer;

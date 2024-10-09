import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:5000/api';
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
    const response = await axios.get(`${API_URL}/posts / ${id}`);
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
    const response = await axios.post(`${API_URL}/posts`, newPost);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedPost }) => {
    const response = await axios.put(`${API_URL}/posts / ${id}`, updatedPost);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await axios.delete(`${API_URL}/ posts / ${id}`);
    return id;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post._id === action.payload._id);
                state.posts[index] = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post._id !== action.payload);
            });
    }
});

export default postsSlice.reducer;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPostById } from '../redux/postsSlice';
import { Card, Container, Spinner, Button } from 'react-bootstrap';

const ViewPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector((state) => state.posts.currentPost);
    const postStatus = useSelector((state) => state.posts.status);
    const [postError, setPostError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                await dispatch(fetchPostById(id));
            } catch (error) {
                setPostError(error.message);
            }
        };
        fetchPost();
    }, [dispatch, id]);

    return (
        <Container className="mt-5">
            <Button variant="secondary" onClick={() => navigate(-1)} className='mb-3'>
                Back
            </Button>
            {postStatus === 'loading' ? ( // Show loading spinner while fetching
                <Spinner animation="border" variant="primary" />
            ) : postError ? (
                <p>Error: {postError}</p>
            ) : post ? (
                <PostDetails post={post} />
            ) : (
                <p>Post not found!</p> // Handle post not found case
            )}
        </Container>
    );
};

const PostDetails = ({ post }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Card.Text>
                    <small className="text-muted">Published on: {new Date(post.createdAt).toLocaleString()}</small>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ViewPost;
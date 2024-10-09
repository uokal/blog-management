import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from '../redux/postsSlice';
import { Card, Container, Spinner } from 'react-bootstrap';

const ViewPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.currentPost);
    const postStatus = useSelector((state) => state.posts.status); // Get the status

    useEffect(() => {
        dispatch(fetchPostById(id));
    }, [dispatch, id]);

    return (
        <Container className="mt-5">
            {postStatus === 'loading' ? ( // Show loading spinner while fetching
                <Spinner animation="border" variant="primary" />
            ) : post ? (
                <Card>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <Card.Text>
                            <small className="text-muted">Published on: {new Date(post.createdAt).toLocaleString()}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                        <p>Post not found!</p> // Handle post not found case
            )}
        </Container>
    );
};

export default ViewPost;

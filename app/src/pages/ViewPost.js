import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from '../redux/postsSlice';
import { Card, Container } from 'react-bootstrap';

const ViewPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.currentPost);

    useEffect(() => {
        dispatch(fetchPostById(id));
    }, [dispatch, id]);

    return (
        <Container className="mt-5">
            {post ? (
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
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default ViewPost;
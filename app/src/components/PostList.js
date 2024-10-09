import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postsSlice';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Container, Button } from 'react-bootstrap';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>Blog Posts</Card.Title>
                    <Link to="/create">
                        <Button variant="primary" className="mb-3">Create New Post</Button>
                    </Link>
                    <ListGroup>
                        {posts.map((post) => (
                            <ListGroup.Item key={post._id}>
                                <Link to={`/view/${post._id}`}>{post.title}</Link>
                                <div className="float-end">
                                    <Link to={`/edit/${post._id}`}>
                                        <Button variant="warning" className="mx-1">Edit</Button>
                                    </Link>
                                    <Button variant="danger" onClick={() => handleDelete(post._id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

const handleDelete = (id) => {
    // Implement the delete logic (dispatch action)
};

export default PostList;
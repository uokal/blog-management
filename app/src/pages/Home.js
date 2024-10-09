import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/postsSlice';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deletePost(id));
    };

    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col>
                    <Link to="/create">
                        <Button variant="success">Create New Post</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                {posts.map((post) => (
                    <Col md={4} key={post._id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    {post.content.substring(0, 100)}...
                                </Card.Text>
                                <Link to={`/view/${post._id}`}>
                                    <Button variant="info" className="me-2">View</Button>
                                </Link>
                                <Link to={`/edit/${post._id}`}>
                                    <Button variant="primary" className="me-2">Edit</Button>
                                </Link>
                                <Button variant="danger" onClick={() => handleDelete(post._id)}>Delete</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;

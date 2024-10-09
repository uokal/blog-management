import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postsSlice';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);



    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col>
                    <Link to="/create">
                        <Button variant="success">Create New Post</Button>
                    </Link>
                </Col>
            </Row>
            <PostList />
        </Container>
    );
};

export default Home;

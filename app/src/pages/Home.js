import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../features/posts/postsSlice';
import Spinner from '../components/Spinner';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';

const Home = () => {
    const dispatch = useDispatch();
    const { posts, status } = useSelector((state) => state.posts);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <Spinner />;
    }

    return (
        <Container>
            <h1>Blog Posts</h1>
            <Button color="primary" tag={Link} to="/create">
                Create New Post
            </Button>
            <ListGroup className="mt-4">
                {posts.map((post) => (
                    <ListGroupItem key={post._id}>
                        <Link to={`/posts/${post._id}`}>
                            <h5>{post.title}</h5>
                            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                        </Link>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Home;

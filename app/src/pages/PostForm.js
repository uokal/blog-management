import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, FormLabel, FormControl, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, fetchPostById } from '../redux/postsSlice';

const PostForm = ({ isCreateMode }) => {
    const { id } = useParams(); // Get post id from the URL for editing
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [initialData, setInitialData] = useState({ title: '', content: '' });

    // Fetch the post if we are in edit mode
    useEffect(() => {
        if (!isCreateMode && id) {
            dispatch(fetchPostById(id)).then((result) => {
                if (result.payload) {
                    setInitialData(result.payload);
                }
            });
        }
    }, [dispatch, id, isCreateMode]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: initialData.title,
            content: initialData.content,
        }
    });

    useEffect(() => {
        if (!isCreateMode && initialData) {
            setValue('title', initialData.title);
            setValue('content', initialData.content);
        }
    }, [initialData, isCreateMode, setValue]);

    const onFormSubmit = (data) => {
        if (isCreateMode) {
            dispatch(createPost(data)).then(() => navigate('/'));
        } else {
            dispatch(updatePost({ id, updatedPost: data })).then(() => navigate('/'));
        }
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>{isCreateMode ? 'Create New Post' : 'Edit Post'}</Card.Title>
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <FormControl
                                id="title"
                                type="text"
                                {...register('title', { required: true })}
                                placeholder="Enter post title"
                            />
                            {errors.title && <p className="text-danger">Title is required</p>}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel htmlFor="content">Content</FormLabel>
                            <FormControl
                                id="content"
                                as="textarea"
                                rows={5}
                                {...register('content', { required: true })}
                                placeholder="Enter post content"
                            />
                            {errors.content && <p className="text-danger">Content is required</p>}
                        </FormGroup>
                        <Button type="submit" variant="primary">
                            {isCreateMode ? 'Create Post' : 'Update Post'}
                        </Button>
                        <Button variant="secondary" onClick={() => navigate(-1)} className='ms-3'>
                            Back
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PostForm;

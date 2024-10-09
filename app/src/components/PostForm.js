import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, fetchPostById } from '../features/posts/postsSlice';

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
        <Card>
            <CardBody>
                <CardTitle tag="h5">{isCreateMode ? 'Create New Post' : 'Edit Post'}</CardTitle>
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            {...register('title', { required: true })}
                            placeholder="Enter post title"
                        />
                        {errors.title && <p className="text-danger">Title is required</p>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input
                            id="content"
                            type="textarea"
                            {...register('content', { required: true })}
                            placeholder="Enter post content"
                        />
                        {errors.content && <p className="text-danger">Content is required</p>}
                    </FormGroup>
                    <Button type="submit" color="primary">
                        {isCreateMode ? 'Create Post' : 'Update Post'}
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default PostForm;

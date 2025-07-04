import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost, getPosts } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.posts.find((message) => message._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    useEffect(() => {
        if (post) {
            setPostData({
                ...post,
                tags: Array.isArray(post.tags) ? post.tags.join(',') : post.tags
            });
        }
    }, [post])

   
    useEffect(() => {
        if (!currentId) {
            setPostData({ title: '', message: '', tags: '', selectedFile: '' });
        }
    }, [currentId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const processedPostData = {
            ...postData,
            tags: typeof postData.tags === 'string' ? postData.tags.split(',').map(tag => tag.trim()) : postData.tags
        };

       
        if (!currentId) {
           await  dispatch(createPost({ ...processedPostData, name: user?.result.name }));
           await dispatch(getPosts());
           
        } else {
           await dispatch(updatePost(currentId, { ...processedPostData, name: user?.result.name }));
        }
        clear();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth 
                    value={postData.title} 
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} 
                />
                
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth 
                    multiline 
                    rows={4} 
                    value={postData.message} 
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
                />
                
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags (comma separated)" 
                    fullWidth 
                    value={postData.tags} 
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })} 
                />
                
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file" 
                        multiple={false} 
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} 
                    />
                </div>
                
                <Button 
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth
                >
                    Submit
                </Button>
                
                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear} 
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
}

export default Form;
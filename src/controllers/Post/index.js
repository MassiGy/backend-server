const { createPost } = require('./createPost');
const { getPost } = require('./getPost');
const { getAllPosts } = require('./getAllPosts');
const { likePost } = require('./likePost');
const { updatePost } = require('./updatePost');
const { deletePost } = require('./deletePost');


module.exports = {
    createPost,
    getPost,
    getAllPosts,
    likePost,
    updatePost,
    deletePost,
};
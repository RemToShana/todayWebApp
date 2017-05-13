const express = require('express');
const bodyParser = require('body-parser');

const postModel = require('../model/posts.js');

const router = express.Router();

router.use(bodyParser.json());

// listPost
router.get('/posts', function(req, res) {
    postModel.listPosts(req.query.HomeTime, req.query.user_id).then(posts => {
        res.json(posts);
    });
});

// CreatePost
router.post('/posts', function(req, res) {
    const {place, deadline, time, input, user_id} = req.body;
    if (!input || !time || !deadline || !place || !user_id) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.createPost(place, deadline, time, input, user_id).then(post => {
        res.json(post);
    });
});

// donePost
router.delete('/posts/:id', function(req, res) {
    const {id} = req.params;
    if (!id) {
        const err = new Error('Post id is required');
        err.status = 400;
        throw err;
    }
    postModel.donePost(id).then(posts => {
        res.json(posts);
    })
});

// resetPostTime
router.put('/posts/:id/:time', function(req, res) {
    const {id, time} = req.params;
    if (!id || !time) {
        const err = new Error('Post id and time are required');
        err.status = 400;
        throw err;
    }
    postModel.resetPostTime(id, time).then(posts => {
        res.json(posts);
    })
});

// createAccount
router.post('/accounts', function(req, res) {
    const {username, password} = req.body;
    if (!username || !password) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.createAccount(username, password).then(account => {
        res.json(account);
    });
});

// findAccount
router.get('/accounts', function(req, res) {
    postModel.findAccount(req.query.id, req.query.username, req.query.password).then(accounts => {
        res.json(accounts);
    });
});

module.exports = router;

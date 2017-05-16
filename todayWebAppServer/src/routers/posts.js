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

//setHomeLocation
router.put('/accounts/home/:lat/:lon/:user_id', function(req, res) {
    const {lat, lon, user_id} = req.params;
    if (!lat || !lon || !user_id) {
        const err = new Error('accounts id and lat lon are required');
        err.status = 400;
        throw err;
    }
    postModel.setHomeLocation(lat, lon, user_id).then(accounts => {
        res.json(accounts);
    })
});

//setOfficeLocation
router.put('/accounts/office/:lat/:lon/:user_id', function(req, res) {
    const {lat, lon, user_id} = req.params;
    if (!lat || !lon || !user_id) {
        const err = new Error('accounts id and lat lon are required');
        err.status = 400;
        throw err;
    }
    postModel.setOfficeLocation(lat, lon, user_id).then(accounts => {
        res.json(accounts);
    })
});

//sentVedioGenres
router.post('/accounts/genres', function(req, res) {
    const {genres, user_id} = req.body;
    if (!genres || !user_id) {
        const err = new Error('user_id and genres are required');
        err.status = 400;
        throw err;
    }
    postModel.sentVedioGenres(genres, user_id).then(accounts => {
        res.json(accounts);
    });
});

//getVedioGenres
router.get('/accounts/genres', function(req, res) {
    postModel.getVedioGenres(req.query.user_id).then(genres => {
        res.json(genres);
    });
});

//sentMusicPrefer
router.post('/accounts/prefer', function(req, res) {
    const {prefer, user_id} = req.body;
    if (!prefer || !user_id) {
        const err = new Error('user_id and prefer are required');
        err.status = 400;
        throw err;
    }
    postModel.sentMusicPrefer(prefer, user_id).then(accounts => {
        res.json(accounts);
    });
});

//getMusicPrfer
router.get('/accounts/prefer', function(req, res) {
    postModel.getMusicPrefer(req.query.user_id).then(prefer => {
        res.json(prefer);
    });
});

module.exports = router;

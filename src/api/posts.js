import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const postKey = 'posts';

export function listPosts(HomeTime = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listPosts(HomeTime));
        }, 1000);
    });
}

// Simulated server-side code
function _listPosts(HomeTime = 0) {
    let postString = localStorage.getItem(postKey);
    let posts = postString ? JSON.parse(postString) : [];
    if (posts.length > 0 && !HomeTime) {
        posts = posts.filter(p => {
            return p.text.toLowerCase().indexOf('') !== -1
        });
    }
    if (posts.length > 0 && HomeTime) {
        posts = posts.filter(p => {
            return p.time == HomeTime
        });
    }
    return posts;
};

export function donePost(id) {
    return new Promise((resolve, reject) => {
        resolve(_donePost(id));
    });
}
export function _donePost(id) {
    let postString = localStorage.getItem(postKey);
    let posts = postString ? JSON.parse(postString) : [];
    if (posts.length > 0) {
        posts = posts.filter(p => {
            if(p.id == id){
              return false;
            }else{
              return true;
            }
        });
    }
    localStorage.setItem(postKey, JSON.stringify(posts));
    return posts;
}

export function resetPostTime(time, id) {
    return new Promise((resolve, reject) => {
        resolve(_resetPostTime(time, id));
    });
}
export function _resetPostTime(time, id) {
    let postString = localStorage.getItem(postKey);
    let posts = postString ? JSON.parse(postString) : [];
    if (posts.length > 0) {
        posts = posts.filter(p => {
            if(p.id == id){
              p.time = time;
              return true;
            }else{
              return true;
            }
        });
    }
    localStorage.setItem(postKey, JSON.stringify(posts));
    return posts;
}

export function createPost(place, deadline, time, input) {
    return new Promise((resolve, reject) => {
        resolve(_createPost(place, deadline, time, input));
    });
}

// Simulated server-side code
function _createPost(place, deadline, time, input) {
    const newPost = {
        id: uuid(),
        place: place,
        text: input,
        deadline: deadline,
        time: time
    };
    const posts = [
        newPost,
        ..._listPosts()
    ];
    localStorage.setItem(postKey, JSON.stringify(posts));
    return newPost;
}

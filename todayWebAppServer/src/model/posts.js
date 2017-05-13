const fs = require('fs');
const uuid = require('uuid/v4');
const cookie = require('react-cookie');

function listPosts(HomeTime = 0, user_id) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-posts.json')) {
            fs.writeFileSync('data-posts.json', '');
        }

        fs.readFile('data-posts.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let posts = data ? JSON.parse(data) : [];
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
            if(posts.length > 0 && user_id){
              posts = posts.filter(p => {
                  return p.user_id == user_id
              });
            }
            resolve(posts);
        });
    });
}

function createPost(place, deadline, time, input, user_id) {
    return new Promise((resolve, reject) => {
        const newPost = {
            id: uuid(),
            place: place,
            text: input,
            deadline: deadline,
            time: time,
            user_id: user_id
        };

        listPosts(0, 0).then(posts => {
            posts = [
                newPost,
                ...posts
            ];
            fs.writeFile('data-posts.json', JSON.stringify(posts), err => {
                if (err) reject(err);

                resolve(newPost);
            });
        });
    });
}

function resetPostTime(id, time) {
  return new Promise((resolve, reject) => {
    listPosts(0, 0).then(posts => {
        posts = posts.map(p => {
            if(p.id == id){
              p.time = time;
            }
            return p;
        });
        fs.writeFile('data-posts.json', JSON.stringify(posts), err => {
            if (err) reject(err);

            resolve(posts);
        });
    });
  });
}


function donePost(id){
  return new Promise((resolve, reject) => {
    listPosts(0, 0).then(posts => {
        posts = posts.filter(p => {
            if(p.id == id){
              return false;
            }else{
              return true;
            }
        });
        fs.writeFile('data-posts.json', JSON.stringify(posts), err => {
            if (err) reject(err);

            resolve(posts);
        });
    });
  });
}

function findAccount(id = "", username = "", password = "") {
  return new Promise((resolve, reject) => {
      if (!fs.existsSync('data-accounts.json')) {
          fs.writeFileSync('data-accounts.json', '');
      }

      fs.readFile('data-accounts.json', 'utf8', (err, data) => {
          if (err) reject(err);

          let accounts = data ? JSON.parse(data) : [];
          if(username && password){
            accounts = accounts.filter(p => {
                return p.username === username && p.password === password
            });
          }
          if(id){
            accounts = accounts.filter(p => {
                return p.id === id
            });
          }
          resolve(accounts);
      });
  });
}

function createAccount(username, password) {
  return new Promise((resolve, reject) => {
    const newAccount = {
        id: uuid(),
        username: username,
        password: password
    };
    findAccount().then(accounts => {
        accounts = [
            newAccount,
            ...accounts
        ];
        fs.writeFile('data-accounts.json', JSON.stringify(accounts), err => {
            if (err) reject(err);

            resolve(newAccount);
        });
    });
  });
}

module.exports = {
    listPosts,
    createPost,
    resetPostTime,
    donePost,
    createAccount,
    findAccount
};

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

function createPost(place, deadline, time, input, has_deadline, user_id) {
    if(!has_deadline){
      deadline = "Routine";
    }
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
        password: password,
        home: [],
        office: [],
        genres: [
          {topic: "TheEllenShow",able: false},
          {topic: "Vox",able: false},
          {topic: "National Geographic",able: false},
          {topic: "Material Design",able: false},
          {topic: "WIRED",able: false}
        ],
        prefer: [
          {topic: "Jazz",able: false},
          {topic: "Pop",able: false},
          {topic: "R&B",able: false},
          {topic: "Classical",able: false}
        ]
    };
    findAccount('', username, password).then(accounts => {
        if(accounts.length !== 0){
          resolve(false);
        }
    });
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

function setHomeLocation(lat, lon, user_id) {
  return new Promise((resolve, reject) => {
    findAccount().then(accounts => {
        accounts = accounts.map(a => {
            if(a.id == user_id){
              a.home = [lat, lon];
            }
            return a;
        });
        fs.writeFile('data-accounts.json', JSON.stringify(accounts), err => {
            if (err) reject(err);

            resolve(accounts);
        });
    });
  });
}

function setOfficeLocation(lat, lon, user_id) {
  return new Promise((resolve, reject) => {
    findAccount().then(accounts => {
        accounts = accounts.map(a => {
            if(a.id == user_id){
              a.office = [lat, lon];
            }
            return a;
        });
        fs.writeFile('data-accounts.json', JSON.stringify(accounts), err => {
            if (err) reject(err);

            resolve(accounts);
        });
    });
  });
}

function sentVedioGenres(genres, user_id) {
  return new Promise((resolve, reject) => {
    findAccount().then(accounts => {
        accounts = accounts.map(a => {
            if(a.id == user_id){
              a.genres = genres;
            }
            return a;
        });
        fs.writeFile('data-accounts.json', JSON.stringify(accounts), err => {
            if (err) reject(err);

            resolve(accounts);
        });
    });
  });
}

function getVedioGenres(user_id) {
  return new Promise((resolve, reject) => {
    var temp_genres = [];
    findAccount().then(accounts => {
        accounts = accounts.map(a => {
            if(a.id == user_id){
              temp_genres = a.genres;
            }
            return a;
        });
    resolve(temp_genres);
    });
  });
}

function sentMusicPrefer(prefer, user_id) {
  return new Promise((resolve, reject) => {
    findAccount().then(accounts => {
        accounts = accounts.map(a => {
            if(a.id == user_id){
              a.prefer = prefer;
            }
            return a;
        });
        fs.writeFile('data-accounts.json', JSON.stringify(accounts), err => {
            if (err) reject(err);

            resolve(accounts);
        });
    });
  });
}

function getMusicPrefer(user_id) {
  return new Promise((resolve, reject) => {
    var temp_prefer = [];
    findAccount().then(accounts => {
        accounts = accounts.map(a => {
            if(a.id == user_id){
              temp_prefer = a.prefer;
            }
            return a;
        });
    resolve(temp_prefer);
    });
  });
}

module.exports = {
    listPosts,
    createPost,
    resetPostTime,
    donePost,
    createAccount,
    findAccount,
    setOfficeLocation,
    setHomeLocation,
    sentVedioGenres,
    getVedioGenres,
    sentMusicPrefer,
    getMusicPrefer
};

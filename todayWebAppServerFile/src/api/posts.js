// import axios from 'axios';
// import uuid from 'uuid/v4';
// import moment from 'moment';
// import 'babel-polyfill';
// import cookie from 'react-cookie';
//
// // const postKey = 'posts';
//
//
// export function setId(id){
//   return new Promise((resolve, reject) => {
//       resolve(_setId(id));
//   });
// }
// function _setId(id){
//     cookie.save('id', id);
//     return;
// }
//
// export function findAccount(id = "", username = "", password = "") {
//     return new Promise((resolve, reject) => {
//         resolve(_findAccount(id, username, password));
//     });
// }
//
// // Simulated server-side code
// function _findAccount(id = "", username = "", password = "") {
//     let accountString = localStorage.getItem('account');
//     let accounts = accountString ? JSON.parse(accountString) : [];
//       if(username && password){
//         accounts = accounts.filter(p => {
//             return p.username === username && p.password === password
//         });
//           return accounts;
//       }
//       accounts = accounts.filter(p => {
//           return p.id === id
//       });
//     return accounts;
// };
//
// export function createAccount(username, password){
//   return new Promise((resolve, reject) => {
//       resolve(_createAccount(username, password));
//   });
// }
//
// function _createAccount(username, password) {
//     const newAccount = {
//         id: uuid(),
//         username: username,
//         password: password
//     };
//     let accountString = localStorage.getItem('account');
//     let old_accounts = accountString ? JSON.parse(accountString) : [];
//     const accounts = [
//         newAccount,
//         ...old_accounts
//     ];
//     localStorage.setItem('account', JSON.stringify(accounts));
//     return newAccount;
// }
//
// export function listPosts(HomeTime = 0) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(_listPosts(HomeTime));
//         }, 1000);
//     });
// }
//
// // Simulated server-side code
// function _listPosts(HomeTime = 0) {
//     let postString = localStorage.getItem(`${cookie.load('id')}`);
//     let posts = postString ? JSON.parse(postString) : [];
//     if (posts.length > 0 && !HomeTime) {
//         posts = posts.filter(p => {
//             return p.text.toLowerCase().indexOf('') !== -1
//         });
//     }
//     if (posts.length > 0 && HomeTime) {
//         posts = posts.filter(p => {
//             return p.time == HomeTime
//         });
//     }
//     return posts;
// };
//
// export function donePost(id) {
//     return new Promise((resolve, reject) => {
//         resolve(_donePost(id));
//     });
// }
// export function _donePost(id) {
//     let postString = localStorage.getItem(`${cookie.load('id')}`);
//     let posts = postString ? JSON.parse(postString) : [];
//     if (posts.length > 0) {
//         posts = posts.filter(p => {
//             if(p.id == id){
//               return false;
//             }else{
//               return true;
//             }
//         });
//     }
//     localStorage.setItem(`${cookie.load('id')}`, JSON.stringify(posts));
//     return posts;
// }
//
// export function resetPostTime(time, id) {
//     return new Promise((resolve, reject) => {
//         resolve(_resetPostTime(time, id));
//     });
// }
// export function _resetPostTime(time, id) {
//     let postString = localStorage.getItem(`${cookie.load('id')}`);
//     let posts = postString ? JSON.parse(postString) : [];
//     if (posts.length > 0) {
//         posts = posts.filter(p => {
//             if(p.id == id){
//               p.time = time;
//               return true;
//             }else{
//               return true;
//             }
//         });
//     }
//     localStorage.setItem(`${cookie.load('id')}`, JSON.stringify(posts));
//     return posts;
// }
//
// export function createPost(place, deadline, time, input) {
//     return new Promise((resolve, reject) => {
//         resolve(_createPost(place, deadline, time, input));
//     });
// }
//
// // Simulated server-side code
// function _createPost(place, deadline, time, input) {
//     const newPost = {
//         id: uuid(),
//         place: place,
//         text: input,
//         deadline: deadline,
//         time: time
//     };
//     const posts = [
//         newPost,
//         ..._listPosts()
//     ];
//     localStorage.setItem(`${cookie.load('id')}`, JSON.stringify(posts));
//     return newPost;
// }
/********************************************************************************/
import axios from 'axios';
import cookie from 'react-cookie';
// Develop server URL
// const postBaseUrl = 'http://localhost:8081/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
const postBaseUrl = 'http://todayapp.us-west-1.elasticbeanstalk.com/api';

export function findAccount(id = "", username = "", password = ""){
  let url = `${postBaseUrl}/accounts`;
  if (id && !username && !password){
      url += `?id=${id}`;
  }
  if (username && password && !id){
      url += `?username=${username}&password=${password}`;
  }
  if (username && password && id){
      url += `?id=${id}&username=${username}&password=${password}`;
  }
  console.log(`Making GET request to: ${url}`);

  return axios.get(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);
      return res.data;
  });
}
export function createAccount(username, password){
  let url = `${postBaseUrl}/accounts`;
  console.log(`Making POST request to: ${url}`);

  return axios.post(url, {
    username, password
  }).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}

export function listPosts(HomeTime = 0, user_id = cookie.load('id')) {
    let url = `${postBaseUrl}/posts?user_id=${user_id}`;
    if (HomeTime)
        url += `&HomeTime=${HomeTime}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createPost(place, deadline, time, input, has_deadline, user_id = cookie.load('id')) {
    let url = `${postBaseUrl}/posts`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
      place, deadline, time, input, has_deadline, user_id
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function donePost(id) {
  let url = `${postBaseUrl}/posts/${id}`;
  console.log(`Making DELET request to: ${url}`);

  return axios.delete(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}
export function resetPostTime(id, time) {
  let url = `${postBaseUrl}/posts/${id}/${time}`;
  console.log(`Making PUT request to: ${url}`);

  return axios.put(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}

export function sentVedioGenres(genres, user_id = cookie.load('id')){
  let url = `${postBaseUrl}/accounts/genres`;
  console.log(`Making POST request to: ${url}`);

  return axios.post(url,{
    genres, user_id
  }).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}
export function getVedioGenres(user_id = cookie.load('id')){
  let url = `${postBaseUrl}/accounts/genres?user_id=${user_id}`;
  console.log(`Making POST request to: ${url}`);

  return axios.get(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}

export function sentMusicPrefer(prefer, user_id = cookie.load('id')){
  let url = `${postBaseUrl}/accounts/prefer`;
  console.log(`Making POST request to: ${url}`);

  return axios.post(url,{
    prefer, user_id
  }).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}
export function getMusicPrefer(user_id = cookie.load('id')){
  let url = `${postBaseUrl}/accounts/prefer?user_id=${user_id}`;
  console.log(`Making POST request to: ${url}`);

  return axios.get(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}


export function setOfficeLocation(lat, lon, user_id = cookie.load('id')){
  let url = `${postBaseUrl}/accounts/office/${lat}/${lon}/${user_id}`;
  console.log(`Making PUT request to: ${url}`);

  return axios.put(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}
export function setHomeLocation(lat, lon, user_id = cookie.load('id')){
  let url = `${postBaseUrl}/accounts/home/${lat}/${lon}/${user_id}`;
  console.log(`Making PUT request to: ${url}`);

  return axios.put(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}
/*google map api*/
const google_key = 'AIzaSyBRM2oOS3EW6eMH8UAXjo61MbwU5I6PPjI';
const googleBaseUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${google_key}`;

export function getOfficeLocationByAddress(office_address){
  var url = `${googleBaseUrl}&address=${office_address}`;

  console.log(`Making request to: ${url}`);

  return axios.get(url).then(function(res) {
      if (res.data.result && res.data.status)
          throw new Error(res.data.status);

      return {
        lat: res.data.results[0].geometry.location.lat,
        lon: res.data.results[0].geometry.location.lng
      };
  }).catch(function(err) {
      if (axios.isCancel(err)) {
          console.error(err.message, err);
      } else {
          throw err;
      }
  });
}

export function getHomeLocationByAddress(home_address){
  var url = `${googleBaseUrl}&address=${home_address}`;

  console.log(`Making request to: ${url}`);

  return axios.get(url).then(function(res) {
      if (res.data.result && res.data.status)
          throw new Error(res.data.status);
      return {
          lat: res.data.results[0].geometry.location.lat,
          lon: res.data.results[0].geometry.location.lng
      };
  }).catch(function(err) {
      if (axios.isCancel(err)) {
          console.error(err.message, err);
      } else {
          throw err;
      }
  });
}

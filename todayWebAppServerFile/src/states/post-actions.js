import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    resetPostTime as resetPostsFromApi,
    donePost as donePostsFromApi,
    createAccount as createAccountFromApi,
    findAccount as findAccountFromApi,
    setId as setIdFromApi,
    setHomeLocation as setHomeLocationFromApi,
    setOfficeLocation as setOfficeLocationFromApi,
    getHomeLocationByAddress as getHomeLocationByAddressFromApi,
    getOfficeLocationByAddress as getOfficeLocationByAddressFromApi,
    sentVedioGenres as sentVedioGenresToApi,
    getVedioGenres as getVedioGenresFromApi,
    sentMusicPrefer as sentMusicPreferToApi,
    getMusicPrefer as getMusicPreferFromApi
} from 'api/posts.js';
import cookie from 'react-cookie';

/* Home time*/
export function setHomeTime(time) {
    return {
        type: '@HOME/SET_TIME',
        Hometime: time
    };
}

export function setHomeButtonColor(time = 0) {
    var Home_button_color = ["secondary", "secondary", "secondary", "secondary", "secondary"];
    if(time == 25){
      Home_button_color = ["#244048", "secondary", "secondary", "secondary", "secondary"];
    }
    else if(time == 10){
      Home_button_color = ["secondary", "primary", "secondary", "secondary", "secondary"];
    }
    else if(time == 5){
      Home_button_color = ["secondary", "secondary", "primary", "secondary", "secondary"];
    }
    else if(time == 15){
      Home_button_color = ["secondary", "secondary", "secondary", "primary", "secondary"];
    }
    else if(time == 20){
      Home_button_color = ["secondary", "secondary", "secondary", "secondary", "primary"];
    }
    return {
        type: '@HOME/SET_BUTTON_COLOR',
        Home_button_color: Home_button_color
    };
}

/*Create*/
export function setInputDanger(inputDanger) {
    return {
        type: '@CREATE/SET_INPUT_DANGER',
        inputDanger: inputDanger
    };
}
export function setTimeDanger(timeDanger) {
    return {
        type: '@CREATE/SET_TIME_DANGER',
        timeDanger: timeDanger
    };
}
export function setDeadlineDanger(deadlineDanger) {
    return {
        type: '@CREATE/SET_DEADLINE_DANGER',
        deadlineDanger: deadlineDanger
    };
}
export function setPlaceDanger(placeDanger) {
    return {
        type: '@CREATE/SET_PLACE_DANGER',
        placeDanger: placeDanger
    };
}
export function setInputValue(inputValue) {
    return {
        type: '@CREATE/SET_IPUT_VALUE',
        inputValue: inputValue
    };
}
export function setDeadline(deadline) {
    return {
        type: '@CREATE/SET_DEADLINE',
        deadline: deadline
    };
}
export function setEstimateButtonColor(time) {
    var estimate_button_color = ["secondary", "secondary", "secondary", "secondary", "secondary"];
    if(time == 5){
      estimate_button_color = ["primary", "secondary", "secondary", "secondary", "secondary"];
    }
    else if(time == 10){
      estimate_button_color = ["secondary", "primary", "secondary", "secondary", "secondary"];
    }
    else if(time == 15){
      estimate_button_color = ["secondary", "secondary", "primary", "secondary", "secondary"];
    }
    else if(time == 20){
      estimate_button_color = ["secondary", "secondary", "secondary", "primary", "secondary"];
    }
    else if(time == 25){
      estimate_button_color = ["secondary", "secondary", "secondary", "secondary", "primary"];
    }
    return {
        type: '@CREATE/SET_ESTIMATE_TIME_BUTTON',
        estimate_button_color: estimate_button_color
    };
}
export function setDeadlineButtonColor(time) {
    var deadline_button_color = ["secondary", "secondary", "secondary"];
    if(time == 0){
      deadline_button_color = ["primary", "secondary", "secondary"];
    }
    else if(time == 1){
      deadline_button_color = ["secondary", "primary", "secondary"];
    }
    else if(time == 2){
      deadline_button_color = ["secondary", "secondary", "primary"];
    }
    return {
        type: '@CREATE/SET_DEADLINE_BUTTON',
        deadline_button_color: deadline_button_color
    };
}
export function setClicked(place) {
    var clicked = ["false", "false", "false"];
    if(place == "home"){
      clicked = ["true", "false", "false"]
    }
    else if(place == "office"){
      clicked = ["false", "true", "false"]
    }
    else if(place == "anywhere"){
      clicked = ["false", "false", "true"]
    }
    return {
        type: '@CREATE/SET_CLICKED',
        clicked: clicked
    };
}
export function setPlace(place) {
    return {
        type: '@CREATE/SET_PLACE',
        place: place
    };
}
export function setEstimateTime(time) {
  return {
      type: '@CREATE/SET_ESTIMATE_TIME',
      estimate_time: time
  };
}
export function toggleHasDeadline() {
  return {
      type: '@CREATE/TOGGLE_HAS_DEADLINE'
  };
}
export function resetCreate() {
  return {
      type: '@CREATE/RESET'
  };
}
export function setLinkText(link_text) {
  return {
      type: '@CREATE/SET_LINK_TEXT',
      link_text: link_text
  };
}

/*mystuff*/
export function setMystuffButtonColor(time) {
    var Mystuff_button_color = ["secondary", "secondary", "secondary", "secondary", "secondary"];
    if(time == 5){
      Mystuff_button_color = ["warning", "secondary", "secondary", "secondary", "secondary"];
    }
    else if(time == 10){
      Mystuff_button_color = ["secondary", "warning", "secondary", "secondary", "secondary"];
    }
    else if(time == 15){
      Mystuff_button_color = ["secondary", "secondary", "warning", "secondary", "secondary"];
    }
    else if(time == 20){
      Mystuff_button_color = ["secondary", "secondary", "secondary", "warning", "secondary"];
    }
    else if(time == 25){
      Mystuff_button_color = ["secondary", "secondary", "secondary", "secondary", "warning"];
    }
    return {
        type: '@MYSTUFF/SET_MYSTUFF_TIME_BUTTON',
        Mystuff_button_color: Mystuff_button_color
    };
}
export function setMystuffPostNumber(shifted_post_number) {
  return {
      type: '@MYSTUFF/SET_MYSTUFF_POST_NUMBER',
      post_number: shifted_post_number
  };
}
/*post list*/

function startListPosts(realcreate) {
    if(realcreate){
      var success_create = true;
    }
    return {
        type: '@LISTPOSTS/START_LIST_POSTS',
        success_create: success_create
    };
}

function endListPosts(posts) {
    return {
        type: '@LISTPOSTS/END_LIST_POSTS',
        posts,
    };
}

function resetPosts() {
    return {
        type: '@LISTPOSTS/RESET_LIST_POSTS'
    };
}
export function resetTime(id, time) {
    return (dispatch, getState) => {
        return resetPostsFromApi(id, time).then(listpost => {
        }).catch(err => {
            console.error('Error resting posts', err);
            dispatch(resetPosts());
        });
    };
};

export function donePost(id) {
    return (dispatch, getState) => {
        return donePostsFromApi(id).then(listpost => {
        }).catch(err => {
            console.error('Error deleteing posts', err);
            dispatch(resetPosts());
        });
    };
};

export function listPosts(HomeTime = 0, realcreate = false) {
    return (dispatch, getState) => {
        dispatch(startListPosts(realcreate));

        return listPostsFromApi(HomeTime, cookie.load("id")).then(listpost => {
            const posts = listpost;
            dispatch(endListPosts(posts));
        }).catch(err => {
            console.error('Error listing posts', err);
            dispatch(resetPosts());
        });
    };
};

export function createPost(place, deadline, time, input, has_deadline, user_id = cookie.load("id")) {
    return (dispatch, getState) => {
        return createPostFromApi(place, deadline, time, input, has_deadline, user_id).then( () => {
            dispatch(listPosts(0, true));
        }).catch(err => {
            console.error('Error creating posts', err);
        });
    };
};

export function toggleTooltip() {
    return {
        type: '@MUSIC/TOGGLE_TOOLTIP'
    };
};

export function setTooltipToggle(tooltipOpen) {
    return {
        type: '@MUSIC/SET_TOOLTIP_TOGGLE',
        tooltipOpen: tooltipOpen
    };
};

export function setMusicState(music_state) {
    return {
        type: '@MUSIC/SET_MUSIC',
        music_state: music_state
    };
};

export function plusMusicStage() {
    return {
        type: '@MUSIC/SET_MUSIC_STAGE'
    };
};
/* login */
export function login_username(input) {
    return {
        type: '@LOGIN/INPUT_USERNAME',
        login_username_value: input
    };
};

export function login_password(input) {
    return {
        type: '@LOGIN/INPUT_PASSWORD',
        login_password_value: input
    };
};
export function login_failure(input) {
    return {
        type: '@LOGIN/LOGIN_FAILURE',
        login_failure: input
    };
};
export function reset_login() {
    return {
        type: '@LOGIN/RESET'
    };
};
export function set_login_password_danger(input) {
    return {
        type: '@LOGIN/SET_PASSWORD_DANGER',
        password_danger: input
    };
};
export function set_login_username_danger(input) {
    return {
        type: '@LOGIN/SET_USERNAME_DANGER',
        username_danger: input
    };
};
/* regitor */
export function registor_username(input) {
    return {
        type: '@REGISTOR/INPUT_USERNAME',
        registor_username_value: input
    };
};

export function registor_password(input) {
    return {
        type: '@REGISTOR/INPUT_PASSWORD',
        registor_password_value: input
    };
};
export function set_password_danger(input) {
    return {
        type: '@REGISTOR/SET_PASSWORD_DANGER',
        password_danger: input
    };
};
export function set_username_danger(input) {
    return {
        type: '@REGISTOR/SET_USERNAME_DANGER',
        username_danger: input
    };
};
export function reset_registor() {
    return {
        type: '@REGISTOR/RESET'
    };
};
export function createAccountSuccess(input) {
    return {
        type: '@REGISTOR/SUCCESS',
        success_create_account: input
    };
};
export function account_exist(input) {
    return {
        type: '@REGISTOR/ACCOUNT_EXISTS',
        account_exist: input
    };
};
/*account api*/
export function findAccount(id, username, password){
  return (dispatch, getState) => {
      return findAccountFromApi(id, username, password).then( accounts => {
          if(accounts.length > 0){
            cookie.save('id', accounts[0].id);
            dispatch(set_id_state(accounts[0].id));
          }
          else if(accounts.length == 0){
            dispatch(login_failure(true));
          }
      }).catch(err => {
          console.error('Error finding account', err);
      });
  };
}

export function createAccount(username, password) {
    return (dispatch, getState) => {
        return createAccountFromApi(username, password).then( newAccount => {
            if(newAccount){
              dispatch(findAccount(newAccount.id, newAccount.username, newAccount.password));
            }else{
              dispatch(account_exist(true));
            }
        }).catch(err => {
            console.error('Error creating account', err);
        });
    };
};

/*Main*/
export function set_id_state(id) {
    return {
        type: '@MAIN/SET_ID',
        id: id
    };
};

/*place-setting*/
export function input_home_address(input) {
    return {
        type: '@PLACE_SETTING/SET_HOME_ADDRESS',
        home_address: input
    };
};
export function input_office_address(input) {
    return {
        type: '@PLACE_SETTING/SET_OFFICE_ADDRESS',
        office_address: input
    };
};
export function set_home_location(lat, lon) {
  return (dispatch, getState) => {
      return setHomeLocationFromApi(lat, lon).then( newAccount => {
      }).catch(err => {
          console.error('Error creating account', err);
      });
  };
};
export function set_office_location(lat, lon) {
  return (dispatch, getState) => {
      return setOfficeLocationFromApi(lat, lon).then( newAccount => {
      }).catch(err => {
          console.error('Error creating account', err);
      });
  };
};
export function set_office_location_by_address(office_address) {
    return (dispatch, getState) => {
        return getOfficeLocationByAddressFromApi(office_address).then(location => {
          const {lat, lon} = location;
          dispatch(set_office_location(lat, lon));
        }).catch(err => {
            console.error('Error getting location', err);
        });
    };
};
export function set_home_location_by_address(home_address) {
    return (dispatch, getState) => {
        return getHomeLocationByAddressFromApi(home_address).then(location => {
          const {lat, lon} = location;
          dispatch(set_home_location(lat, lon));
        }).catch(err => {
            console.error('Error getting location', err);
        });
    };
};

/*video genres*/
export function set_vedio_genres(input) {
  return {
      type: '@VEDIO_GENRES/SET',
      genres: input
  };
};

export function sent_vedio_genres_to_api(genres) {
    return (dispatch, getState) => {
        return sentVedioGenresToApi(genres).then(location => {
        }).catch(err => {
            console.error('Error senttig genres', err);
        });
    };
};
export function set_vedio_genres_state_from_api() {
    return (dispatch, getState) => {
        return getVedioGenresFromApi().then(genres => {
          dispatch(set_vedio_genres(genres));
        }).catch(err => {
            console.error('Error senttig genres', err);
        });
    };
};

/*music prefer*/
export function set_music_prefer(input) {
  return {
      type: '@MUSIC_PREFER/SET',
      prefer: input
  };
};

export function sent_music_prefer_to_api(prefer) {
    return (dispatch, getState) => {
        return sentMusicPreferToApi(prefer).then(location => {
        }).catch(err => {
            console.error('Error senttig prefer', err);
        });
    };
};
export function set_music_prefer_state_from_api() {
    return (dispatch, getState) => {
        return getMusicPreferFromApi().then(prefer => {
          dispatch(set_music_prefer(prefer));
        }).catch(err => {
            console.error('Error senttig prefer', err);
        });
    };
};

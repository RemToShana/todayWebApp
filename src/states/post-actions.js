import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    resetPostTime as resetPostsFromApi,
    donePost as donePostsFromApi
} from 'api/posts.js';

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
      Home_button_color = ["primary", "secondary", "secondary", "secondary", "secondary"];
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
export function resetTime(time, id) {
    return (dispatch, getState) => {
        return resetPostsFromApi(time, id).then(listpost => {
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

        return listPostsFromApi(HomeTime).then(listpost => {
            const posts = listpost;
            dispatch(endListPosts(posts));
        }).catch(err => {
            console.error('Error listing posts', err);
            dispatch(resetPosts());
        });
    };
};

export function createPost(place, deadline, time, input) {
    return (dispatch, getState) => {
        return createPostFromApi(place, deadline, time, input).then( () => {
            dispatch(listPosts(0, true));
        }).catch(err => {
            console.error('Error creating posts', err);
        });
    };
};

import cookie from 'react-cookie';

const initHomeState = {
  HomeTime: 0,
  Home_button_color: ["secondary", "secondary", "secondary", "secondary", "secondary"]
};

export function Home(state = initHomeState, action) {
    switch (action.type) {
        case '@HOME/SET_TIME':
            return {
                ...state,
                HomeTime: action.Hometime
            };
        case '@HOME/SET_BUTTON_COLOR':
            return {
                ...state,
                Home_button_color: action.Home_button_color
            };
        default:
            return state;
    }
}

const initMystuffState = {
  Mystuff_button_color: ["secondary", "secondary", "secondary", "secondary", "secondary"],
  post_number: 0
};

export function Mystuff(state = initMystuffState, action) {
  switch (action.type) {
      case '@MYSTUFF/SET_MYSTUFF_TIME_BUTTON':
          return {
              ...state,
              Mystuff_button_color: action.Mystuff_button_color
          };
      case '@MYSTUFF/SET_MYSTUFF_POST_NUMBER':
          return {
              ...state,
              post_number: action.post_number
          };
      default:
          return state;
  }
}

const initCreateState = {
    inputValue: "",
    inputDanger: false,
    timeDanger: "is_false",
    deadlineDanger: "is_false",
    placeDanger: "is_false",
    estimate_time: -1,
    has_deadline: true,
    deadline: "",
    estimate_button_color: ["secondary", "secondary", "secondary", "secondary", "secondary"],
    deadline_button_color: ["secondary", "secondary", "secondary"],
    place: "",
    clicked: ["false", "false", "false"],
    link_text: '/create'
}

export function Create(state = initCreateState, action) {
    switch (action.type) {
        case '@CREATE/SET_INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.inputDanger
            };
        case '@CREATE/SET_TIME_DANGER':
            return {
                ...state,
                timeDanger: action.timeDanger
            };
        case '@CREATE/SET_DEADLINE_DANGER':
            return {
                ...state,
                deadlineDanger: action.deadlineDanger
            };
        case '@CREATE/SET_PLACE_DANGER':
            return {
                ...state,
                placeDanger: action.placeDanger
            };
        case '@CREATE/SET_IPUT_VALUE':
            return {
                ...state,
                inputValue: action.inputValue
            };
        case '@CREATE/SET_DEADLINE':
            return {
                ...state,
                deadline: action.deadline
            };
        case '@CREATE/SET_ESTIMATE_TIME_BUTTON':
            return {
                ...state,
                estimate_button_color: action.estimate_button_color
            };
        case '@CREATE/SET_DEADLINE_BUTTON':
            return {
                ...state,
                deadline_button_color: action.deadline_button_color
            };
        case '@CREATE/SET_CLICKED':
            return {
                ...state,
                clicked: action.clicked
            };
        case '@CREATE/SET_PLACE':
            return {
                ...state,
                place: action.place
            };
        case '@CREATE/SET_ESTIMATE_TIME':
            return {
                ...state,
                estimate_time: action.estimate_time
            };
        case '@CREATE/TOGGLE_HAS_DEADLINE':
            return {
                ...state,
                has_deadline: !state.has_deadline
            };
        case '@CREATE/RESET':
            return {
                ...initCreateState
            };
        case '@CREATE/SET_LINK_TEXT':
            return {
                ...state,
                link_text: action.link_text
            };
        default:
            return state;
    }
}

const initPostState = {
      success_create: false,
      posts: []
};

export function ListPosts(state = initPostState, action) {
    switch (action.type) {
        case '@LISTPOSTS/START_LIST_POSTS':
            return {
                ...state,
                success_create: action.success_create
            };
        case '@LISTPOSTS/END_LIST_POSTS':
            return {
                ...state,
                posts: action.posts,
                success_create: false
            };
        case '@LISTPOSTS/RESET_LIST_POSTS':
            return {
                ...state,
                posts: [],
                success_create: false
            };
        default:
            return state;
    }
}

const initMusicToolTipState = {
    tooltipOpen: false,
    music_state: "music",
    music_stage: [false, false, false, false, false]
};

export function Music(state = initMusicToolTipState, action) {
    switch (action.type) {
        case '@MUSIC/TOGGLE_TOOLTIP':
            return {
                ...state,
                tooltipOpen: !state.tooltipOpen
            };
        case '@MUSIC/SET_TOOLTIP_TOGGLE':
            return {
                ...state,
                tooltipOpen: action.tooltipOpen
            };
        case '@MUSIC/SET_MUSIC':
            return {
                ...state,
                music_state: action.music_state
            };
        case '@MUSIC/SET_MUSIC_STAGE':
              if(state.music_stage[0] && !state.music_stage[1]){
                return {
                    ...state,
                    music_stage: [true, true, false, false, false]
                };
              }
              else if(state.music_stage[1] && !state.music_stage[2]){
                return {
                    ...state,
                    music_stage: [true, true, true, false, false]
                };
              }
              else if(state.music_stage[2] && !state.music_stage[3]){
                return {
                    ...state,
                    music_stage: [true, true, true, true, false]
                };
              }
              else if(state.music_stage[3] && !state.music_stage[4]){
                return {
                    ...state,
                    music_stage: [true, true, true, true, true]
                };
              }
              else if(!state.music_stage[0]){
                return {
                    ...state,
                    music_stage: [true, false, false, false, false]
                };
              }
        default:
            return state;
    }
}

const initLoginState = {
    login_username_value: '',
    login_password_value: '',
    login_failure: false,
    username_danger: '',
    password_danger: ''
};

export function Login(state = initLoginState, action) {
    switch (action.type) {
        case '@LOGIN/INPUT_USERNAME':
            return {
                ...state,
                login_username_value: action.login_username_value
            };
        case '@LOGIN/INPUT_PASSWORD':
            return {
                ...state,
                login_password_value: action.login_password_value
            };
        case '@LOGIN/LOGIN_FAILURE':
            return {
                ...state,
                login_failure: action.login_failure
            };
        case '@LOGIN/RESET':
            return {
                ...initLoginState
            };
        case '@LOGIN/SET_PASSWORD_DANGER':
            return {
                ...state,
                password_danger: action.password_danger
            };
        case '@LOGIN/SET_USERNAME_DANGER':
            return {
                ...state,
                username_danger: action.username_danger
            };
        default:
            return state;
    }
}

const initRegistorState = {
    registor_username_value: '',
    registor_password_value: '',
    username_danger: '',
    password_danger: '',
    success_create_account: false,
    account_exist: false
};

export function Registor(state = initRegistorState, action) {
    switch (action.type) {
        case '@REGISTOR/INPUT_USERNAME':
            return {
                ...state,
                registor_username_value: action.registor_username_value
            };
        case '@REGISTOR/INPUT_PASSWORD':
            return {
                ...state,
                registor_password_value: action.registor_password_value
            };
        case '@REGISTOR/SET_USERNAME_DANGER':
            return {
                ...state,
                username_danger: action.username_danger
            };
        case '@REGISTOR/SET_PASSWORD_DANGER':
            return {
                ...state,
                password_danger: action.password_danger
            };
        case '@REGISTOR/RESET':
            return {
              ...initRegistorState
            };
        case '@REGISTOR/SUCCESS':
            return {
              ...state,
              success_create_account: action.success_create_account
            };
        case '@REGISTOR/ACCOUNT_EXISTS':
            return {
              ...state,
              account_exist: action.account_exist
            };
        default:
            return state;
    }
}

const initMainState = {
    id: cookie.load('id')
};

export function Main_state(state = initMainState, action) {
    switch (action.type) {
        case '@MAIN/SET_ID':
            return {
                id: action.id
            };
        default:
            return state;
    }
}

const initPlaceSettingState = {
  home_address: '',
  office_address: ''
}

export function Place_setting(state = initPlaceSettingState, action) {
    switch (action.type) {
        case '@PLACE_SETTING/SET_HOME_ADDRESS':
            return {
                home_address: action.home_address
            };
        case '@PLACE_SETTING/SET_OFFICE_ADDRESS':
            return {
                office_address: action.office_address
            };
        default:
            return state;
    }
}

const initVedioSettingState = {
  genres: [
    {
      topic: "TheEllenShow",
      able: false
    },
    {
      topic: "Vox",
      able: false
    },
    {
      topic: "National Geographic",
      able: false
    },
    {
      topic: "Material Design",
      able: false
    },
    {
      topic: "WIRED",
      able: false
    }
  ]
}

export function Vedio_genres(state = initVedioSettingState, action) {
    switch (action.type) {
        case '@VEDIO_GENRES/SET':
            return {
                genres: action.genres
            };
        default:
            return state;
    }
}

const initMusicSettingState = {
  prefer: [
    {
      topic: "Jazz",
      able: false
    },
    {
      topic: "Pop",
      able: false
    },
    {
      topic: "R&B",
      able: false
    },
    {
      topic: "Classical",
      able: false
    }
  ]
}

export function Music_prefer(state = initMusicSettingState, action) {
    switch (action.type) {
        case '@MUSIC_PREFER/SET':
            return {
                prefer: action.prefer
            };
        default:
            return state;
    }
}

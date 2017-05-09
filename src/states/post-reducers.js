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

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    NavLink,
    Button,
    Alert,
    Tooltip
} from 'reactstrap';
import {
    Link
} from 'react-router-dom'
import {
  setHomeButtonColor, setHomeTime, listPosts,
  toggleTooltip, setTooltipToggle, setMusicState,
  createAccountSuccess, set_vedio_genres_state_from_api,
  set_music_prefer_state_from_api
} from 'states/post-actions.js';
import './Home.css';



class Home extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handle_time_button_click = this.handle_time_button_click.bind(this);
        this.jump_button_click = this.jump_button_click.bind(this);
        this.handle_play_button_click = this.handle_play_button_click.bind(this);
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(listPosts(0));
        this.props.dispatch(setHomeTime(0));
        this.props.dispatch(set_vedio_genres_state_from_api());
        this.props.dispatch(set_music_prefer_state_from_api());
    }

    handle_play_button_click(){
      this.props.dispatch(setMusicState("pause"));
      var audio = document.getElementById("audio");
      audio.src = require('../resource/1.mp3');
      audio.play();
      this.props.dispatch(setTooltipToggle(false));
    }

    handleTooltipToggle() {
        this.props.dispatch(toggleTooltip());
    }

    handle_time_button_click(time){
      this.props.dispatch(setHomeButtonColor(time));
      this.props.dispatch(setHomeTime(time));
      this.props.dispatch(listPosts(time));
    }

    jump_button_click(){
      this.props.dispatch(createAccountSuccess(false));
      this.props.dispatch(setHomeButtonColor());
    }

    render() {
        const {Home_button_color, success_create, tooltipOpen, music_state, music_stage, registor_username_value, success_create_account} = this.props;
        return (
          <div>
            <div className="button">
                <Button color={`${Home_button_color[0]}`} onClick={() => this.handle_time_button_click(25)}>
                  <span className="time">25</span>
                </Button>{' '}
                <Button color={`${Home_button_color[1]}`} onClick={() => this.handle_time_button_click(10)}>
                  <span className="time">10</span>
                </Button>{' '}
                <Button color={`${Home_button_color[2]}`} onClick={() => this.handle_time_button_click(5)}>
                  <span className="lg-time">&nbsp;5&nbsp;</span>
                </Button>{' '}
                <Button color={`${Home_button_color[3]}`} onClick={() => this.handle_time_button_click(15)}>
                  <span className="time">15</span>
                </Button>{' '}
                <Button color={`${Home_button_color[4]}`} onClick={() => this.handle_time_button_click(20)}>
                  <span className="time">20</span>
                </Button>{' '}
            </div>
            <div className="minute">minutes</div>
            <div  className="center">
              <Button  tag={Link} to='/mystuff' onClick={() => this.jump_button_click()} className="myStuff_button">
                <div className="mystuff">
                  &nbsp;
                  <img src={require('../resource/myStuff.png')} className="icon"></img>
                  &nbsp;&nbsp;&nbsp;
                  MY STUFF
                </div>
              </Button>
            </div>

            <div  className="center">
              <Button tag={Link} to='/mystuff' onClick={() => this.jump_button_click()} className="video_button">
                <div className="video">
                  &nbsp;
                  <img src={require('../resource/video.png')} className="icon"></img>

                  &nbsp;&nbsp;&nbsp;
                  VIDEO
                </div>
              </Button>
            </div>

            <div className="center">
              <Button  tag={Link} to='/article' onClick={() => this.jump_button_click()} className="article_button">
                <div className="article">
                  &nbsp;
                  <img src={require('../resource/articles.png')} className="icon"></img>
                  &nbsp;&nbsp;&nbsp;
                  ARTICLE
                </div>
              </Button>
            </div>
            <div className="bottom-container">
              <NavLink tag={Link} to='/create' onClick={() => this.jump_button_click()}>
                <img src={require('../resource/plus.png')} className="icon_plus"></img>
              </NavLink>
              <div className = "music_play_button">
                <img src={require('../resource/musicPlay.png')} className="icon_music" id = "play_music"></img>

                <audio id="audio" src={require('../resource/1.mp3')} hidden="true"></audio>
              </div>
              <NavLink tag={Link} to='/setting'>
                <img src={require('../resource/profile.png')} className="icon_profile"></img>
              </NavLink>
            </div>{
                success_create &&
                <Alert color='warning' className='success_create'>Successfully created</Alert>
            }
            {
                success_create_account &&
                <Alert color='warning' className='success_create_account'>
                  Welcome!
                  <br/>
                  {registor_username_value}
                  <br/>
                  Your account has been successfully created
                  <br/>
                  Click the button on your lefthand side
                  <br/>
                  to create an event
                  <br/>
                  And click the button on your righthand side
                  <br/>
                  to set up your settings
                  <br/>
                </Alert>
            }
            <Tooltip placement="bottom" isOpen={tooltipOpen} autohide={false} target="play_music" toggle={this.handleTooltipToggle}>

              <img src={require('../resource/note1.png')} className="icon" onClick={() => this.handle_play_button_click()}></img>&nbsp;&nbsp;
              <img src={require('../resource/note2.png')} className="icon" onClick={() => this.handle_play_button_click()}></img>&nbsp;&nbsp;
              <img src={require('../resource/note3.png')} className="icon" onClick={() => this.handle_play_button_click()}></img>&nbsp;&nbsp;

            </Tooltip>
          </div>
        );
    }
}

export default connect((state) => {
    return {
      ...state.ListPosts,
      ...state.Home,
      ...state.Music,
      ...state.Registor,
      ...state.Vedio_genres,
      ...state.Music_prefer
    };
})(Home);

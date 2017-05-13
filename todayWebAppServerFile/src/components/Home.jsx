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
import {setHomeButtonColor, setHomeTime, listPosts, toggleTooltip, setTooltipToggle, setMusicState} from 'states/post-actions.js';
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
      this.props.dispatch(setHomeButtonColor());
    }

    render() {
        const {Home_button_color, success_create, tooltipOpen, music_state, music_stage} = this.props;
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
              <Button color="info" tag={Link} to='/mystuff' onClick={() => this.jump_button_click()} className="link_button">
                <div className="mystuff">
                  &nbsp;
                  <i className="fa fa-list"></i>
                  &nbsp;&nbsp;&nbsp;
                  MY STUFF
                </div>
              </Button>
            </div>
            <div className="center">
              <Button color="danger" tag={Link} to='/article' onClick={() => this.jump_button_click()} className="link_button">
                <div className="article">
                  &nbsp;
                  <i className="fa fa-newspaper-o"></i>
                  &nbsp;&nbsp;&nbsp;
                  ARTICLE
                </div>
              </Button>
            </div>
            <div className="bottom-container">
              <NavLink tag={Link} to='/create' onClick={() => this.jump_button_click()}>
                <i className="fa fa-plus plus-class"></i>
              </NavLink>
              <div className = "music_play_button">
                <i className={`fa fa-${music_state} ${music_state}-button-class`} id = "play_music"></i>
                <audio id="audio" src={require('../resource/1.mp3')} hidden="true"></audio>
              </div>
              <NavLink tag={Link} to='/registor'>
                <i className="fa fa-user user-class"></i>
              </NavLink>
            </div>{
                success_create &&
                <Alert color='warning' className='success_create'>Successfully created</Alert>
            }
            <Tooltip placement="bottom" isOpen={tooltipOpen} autohide={false} target="play_music" toggle={this.handleTooltipToggle}>
              <i className={`fa fa-user music-class-${music_stage[0]}`} onClick={() => this.handle_play_button_click()}></i>&nbsp;&nbsp;
              <i className={`fa fa-user music-class-${music_stage[1]}`} onClick={() => this.handle_play_button_click()}></i>&nbsp;&nbsp;
              <i className={`fa fa-user music-class-${music_stage[2]}`} onClick={() => this.handle_play_button_click()}></i>&nbsp;&nbsp;
              <i className={`fa fa-user music-class-${music_stage[3]}`} onClick={() => this.handle_play_button_click()}></i>&nbsp;&nbsp;
              <i className={`fa fa-user music-class-${music_stage[4]}`} onClick={() => this.handle_play_button_click()}></i>&nbsp;&nbsp;
            </Tooltip>         
          </div>
        );
    }
}

export default connect((state) => {
    return {
      ...state.ListPosts,
      ...state.Home,
      ...state.Music
    };
})(Home);

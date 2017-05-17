import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    NavLink,
    Input,
    Button,
    Card,
    CardText,
    CardBlock,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Alert,
    Label
} from 'reactstrap';
import {
    Link
} from 'react-router-dom'
import './Setting.css';
import {
  set_id_state
} from 'states/post-actions.js';
import cookie from 'react-cookie';

class Setting extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handle_log_out = this.handle_log_out.bind(this);
    }

    handle_log_out(){
      cookie.remove("id");
      this.dispatch(set_id_state(''));
    }

    render() {

      return (
          <div>
            <video loop = {true} controls={false} autoPlay style={{width:"370px", position:"absolute",marginLeft:"54.5%",marginTop:"-32px", zIndex:"-10"}} >
              <source src={"/fire.mp4"} type="video/mp4"/>
            </video>
            <Button className="backbtn" tag={Link} to='/'>
              <img  className="backIcon" src={require('../resource/back.png')} onClick={() => this.handle_place_button_click("home")}></img>
            </Button>
            <div className="card-container">

              <div className="setting-top">
                <div className="left-top">
                  <div className="welcome">
                    <h3>Welcome,</h3>
                  </div>
                  <div className="username">
                    Jack
                  </div>
                </div>
                <div className="right-top">
                  <img  className="pic" src={require('../resource/profilePic.png')} ></img>
                </div>
              </div>
              <div className="setting-item-container">
                <div className="flex-display">
                  <NavLink className="subtitle" tag={Link} to='/placeSetting'>Home & Office</NavLink>
                  <img src={require('../resource/settings_home.png')} className="settingsIcon"></img>
                </div>
                <hr/>
                <div className="flex-display">
                  <NavLink className="subtitle" tag={Link} to='/vedioGenres'>Video Genres</NavLink>
                  <img src={require('../resource/settings_video.png')} className="settingsIcon"></img>
                </div>
                <hr/>
                <div className="flex-display">
                  <NavLink className="subtitle"  tag={Link} to='/musicPreferences'>Music Preferences</NavLink>
                  <img src={require('../resource/settings_music.png')} className="settingsIcon"></img>
                </div>
                <hr/>
                <div className="flex-display">
                  <NavLink className="subtitle" tag={Link} to='/articleTopics'>Terms of Use</NavLink>
                  <img src={require('../resource/settings_terms.png')} className="settingsIcon"></img>
                </div>
                <hr/>
              </div>
            </div>

            <div className="logoutContainer">
              <NavLink className="logout" tag={Link} to='/' onClick={() => this.handle_log_out()}>Log out</NavLink>
            </div>

          </div>
      );
    }
}

export default connect((state) => {
  return {
    ...state.Registor,
    ...state.Login,
    ...state.Main_state
  };
})(Setting);

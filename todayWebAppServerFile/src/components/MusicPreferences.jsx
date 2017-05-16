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
import './MusicPreferences.css';
import {
  set_music_prefer, sent_music_prefer_to_api, set_music_prefer_state_from_api
} from 'states/post-actions.js';


class MusicPreferences extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handle_save_music_prefer_click = this.handle_save_music_prefer_click.bind(this);
        this.handle_music_prefer_click = this.handle_music_prefer_click.bind(this);
    }

    componentDidMount(){
      var {prefer} = this.props;
      prefer = prefer.map(p => {
        if(p.able == true){
          document.getElementById(`${p.topic}`).className = "li-button-clicked btn btn-secondary";
          document.getElementById(`${p.topic}-li`).className = "disc-li"
        }
        return p;
      });
    }
    handle_music_prefer_click(topic){
      var {prefer} = this.props;
      if(document.getElementById(`${topic}`).className === "li-button btn btn-secondary"){
        document.getElementById(`${topic}`).className = "li-button-clicked btn btn-secondary";
        document.getElementById(`${topic}-li`).className = "disc-li";
        prefer = prefer.map(p => {
            if(p.topic == topic){
              p.able = true;
            }
            return p;
        });
        this.props.dispatch(set_music_prefer(prefer));
      }
      else if(document.getElementById(`${topic}`).className === "li-button-clicked btn btn-secondary"){
        document.getElementById(`${topic}`).className = "li-button btn btn-secondary";
        document.getElementById(`${topic}-li`).className = "circle-li";
        prefer = prefer.map(p => {
            if(p.topic == topic){
              p.able = false;
            }
            return p;
        });
        this.props.dispatch(set_music_prefer(prefer));
      }
    }
    handle_save_music_prefer_click(prefer){
      this.props.dispatch(sent_music_prefer_to_api(prefer));
    }

    render() {
      const {prefer} = this.props;

      return (
          <div>
            <div className="card-container">
              <div className="top">
                <Button tag={Link} to='/setting'>{`<`}</Button>
                <div className="home_office">Music Preferences</div>
              </div>
              <ul className="article-list">
                <li id="Jazz-li" className="circle-li">
                  <Button onClick={() => this.handle_music_prefer_click("Jazz")} id="Jazz" className="li-button">
                    Jazz
                  </Button>
                </li>
                <li id="Pop-li" className="circle-li">
                  <Button onClick={() => this.handle_music_prefer_click("Pop")} id="Pop" className="li-button">
                    Pop
                  </Button>
                </li>
                <li id="R&B-li" className="circle-li">
                  <Button onClick={() => this.handle_music_prefer_click("R&B")} id="R&B" className="li-button">
                    R&B
                  </Button>
                </li>
                <li id="Classical-li" className="circle-li">
                  <Button onClick={() => this.handle_music_prefer_click("Classical")} id="Classical" className="li-button">
                    Classical
                  </Button>
                </li>
              </ul>
              <div className="place-button">
                <Button color="info" className="link_button" tag={Link} to='/setting' onClick={() => this.handle_save_music_prefer_click(prefer)}>
                  <span className="button-save">Save</span>
                </Button>
              </div>
            </div>
          </div>
      );
    }
}

export default connect((state) => {
  return {
    ...state.Music_prefer
  };
})(MusicPreferences);

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
import './VedioGenres.css';
import {
  set_vedio_genres, sent_vedio_genres_to_api, set_vedio_genres_state_from_api
} from 'states/post-actions.js';


class VedioGenres extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handle_vedio_genres_click = this.handle_vedio_genres_click.bind(this);
        this.handle_save_genres_click = this.handle_save_genres_click.bind(this);
    }

    componentDidMount(){
      var {genres} = this.props;
      genres = genres.map(g => {
        if(g.able == true){
          document.getElementById(`${g.topic}`).className = "li-button-clicked btn btn-secondary";
          document.getElementById(`${g.topic}-li`).className = "disc-li"
        }
        return g;
      });
    }
    handle_vedio_genres_click(topic){
      var {genres} = this.props;
      if(document.getElementById(`${topic}`).className === "li-button btn btn-secondary"){
        document.getElementById(`${topic}`).className = "li-button-clicked btn btn-secondary";
        document.getElementById(`${topic}-li`).className = "disc-li";
        genres = genres.map(g => {
            if(g.topic == topic){
              g.able = true;
            }
            return g;
        });
        this.props.dispatch(set_vedio_genres(genres));
      }
      else if(document.getElementById(`${topic}`).className === "li-button-clicked btn btn-secondary"){
        document.getElementById(`${topic}`).className = "li-button btn btn-secondary";
        document.getElementById(`${topic}-li`).className = "circle-li";
        genres = genres.map(g => {
            if(g.topic == topic){
              g.able = false;
            }
            return g;
        });
        this.props.dispatch(set_vedio_genres(genres));
      }
    }
    handle_save_genres_click(genres){
      this.props.dispatch(sent_vedio_genres_to_api(genres));
    }

    render() {
      const {genres} = this.props;
      return (
          <div>
            <Button className="backbtn" tag={Link} to='/setting'>
              <img  className="backIcon" src={require('../resource/back.png')} onClick={() => this.handle_place_button_click("home")}></img>
            </Button>
            <div className="card-container">
              <div className="top">

                <div className="home_office">Video Genres</div>
              </div>
              <ul className="article-list">
                <li id="TheEllenShow-li" className="circle-li">
                  <Button onClick={() => this.handle_vedio_genres_click("TheEllenShow")} id="TheEllenShow" className="li-button">
                    TheEllenShow
                  </Button>
                </li>
                <li id="Vox-li" className="circle-li">
                  <Button onClick={() => this.handle_vedio_genres_click("Vox")} id="Vox" className="li-button">
                    Vox
                  </Button>
                </li>
                <li id="National Geographic-li" className="circle-li">
                  <Button onClick={() => this.handle_vedio_genres_click("National Geographic")} id="National Geographic" className="li-button">
                    National Geographic
                  </Button>
                </li>
                <li id="Material Design-li" className="circle-li">
                  <Button onClick={() => this.handle_vedio_genres_click("Material Design")} id="Material Design" className="li-button">
                    Material Design
                  </Button>
                </li>
                <li id="WIRED-li" className="circle-li">
                  <Button onClick={() => this.handle_vedio_genres_click("WIRED")} id="WIRED" className="li-button">
                    WIRED
                  </Button>
                </li>
              </ul>

              <div className="place-button">
                <Button color="info" tag={Link} to='/setting' onClick={() => this.handle_save_genres_click(genres)} className="save_button">
                  <span className="button-save">save</span>
                </Button>
              </div>
            </div>
          </div>
      );
    }
}

export default connect((state) => {
  return {
    ...state.Vedio_genres
  };
})(VedioGenres);

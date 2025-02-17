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
    ListGroupItem
} from 'reactstrap';
import {
    Link
} from 'react-router-dom';
import {
  listPosts, setMystuffButtonColor, resetTime,
  donePost, setMystuffPostNumber, setHomeTime,
  plusMusicStage
} from 'states/post-actions.js';
import './Mystuff.css';

var length = 0;

class Mystuff extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handle_time_button_click = this.handle_time_button_click.bind(this);
        this.handle_done_button_click = this.handle_done_button_click.bind(this);
        this.shift_left = this.shift_left.bind(this);
        this.shift_right = this.shift_right.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(listPosts(this.props.HomeTime));
    }
    handle_time_button_click(time, id){
      this.props.dispatch(setMystuffButtonColor(time));
      this.props.dispatch(resetTime(id, time));
      this.props.dispatch(setMystuffButtonColor(0));
      this.props.dispatch(setHomeTime(0));
    }
    handle_done_button_click(id){
      this.props.dispatch(donePost(id));
      this.props.dispatch(setHomeTime(0));
      this.props.dispatch(plusMusicStage());
    }
    shift_right(post_number){
      if(length-1 > post_number){
        this.props.dispatch(setMystuffPostNumber(post_number + 1));
      }
    }
    shift_left(post_number){
      if(post_number > 0){
        this.props.dispatch(setMystuffPostNumber(post_number - 1));
      }
    }
    render() {
        const {posts, HomeTime, Mystuff_button_color, post_number} = this.props;
        var card_number = ["transparent", "transparent"];
        var left_ok = "cannot_shift";
        var right_ok = "cannot_shift";
        length = posts.length;
        if(length - 1 > post_number){
          right_ok = "can_shift";
        }
        if(post_number > 0){
          left_ok = "can_shift";
        }
        if(posts.length > 2){
          card_number = ["nontransparent", "nontransparent"];
        }
        else if(posts.length == 2){
          card_number = ["transparent", "nontransparent"];
        }
        let children = (
          <div className="card-container">

            <Card block inverse color="info" className="top-card">

             <CardBlock>
                <CardTitle className="bigger"> You have nothing in your todo list.</CardTitle>

                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
             </CardBlock>
            </Card>
          </div>
        );
        if (posts.length) {
            children = (
              <div className="card-container">
                <Card block inverse color="info" className={`bottom-card ${card_number[0]}`} id="bottomCardId">

                </Card>
                <Card block inverse color="info" className={`middle-card ${card_number[1]}`} id="bottomCardId">

                </Card>
                <Card block inverse color="info" className="top-card">

                  <CardBlock>
                    <CardTitle className="cardTitle"><img  className="cardIcon" src={require('../resource/mystuffIcon.png')} ></img>&nbsp; IT'S TIME TO</CardTitle>
                    <CardText className="larger">{posts[post_number].text}</CardText>
                    <CardText className="mystuff_deadline">
                      (deadline:&nbsp;
                      {posts[post_number].deadline})
                    </CardText>


                    <div className="notyetContainer">
                      <span className="not_yet">&nbsp;&nbsp;not yet, I still need &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (minutes)</span>
                    </div>
                    <div className="mystuff_button">
                        <Button className="last_time_btn" color={`${Mystuff_button_color[0]}`} onClick={() => this.handle_time_button_click(5, posts[post_number].id)} tag={Link} to='/'>
                          <span className="last_time">&nbsp;5&nbsp;</span>
                        </Button>{' '}
                        <Button className="last_time_btn" color={`${Mystuff_button_color[1]}`} onClick={() => this.handle_time_button_click(10, posts[post_number].id)} tag={Link} to='/'>
                          <span className="last_time">10</span>
                        </Button>{' '}
                        <Button className="last_time_btn" color={`${Mystuff_button_color[2]}`} onClick={() => this.handle_time_button_click(15, posts[post_number].id)} tag={Link} to='/'>
                          <span className="last_time">15</span>
                        </Button>{' '}
                        <Button className="last_time_btn" color={`${Mystuff_button_color[3]}`} onClick={() => this.handle_time_button_click(20, posts[post_number].id)} tag={Link} to='/'>
                          <span className="last_time">20</span>
                        </Button>{' '}
                        <Button className="last_time_btn" color={`${Mystuff_button_color[4]}`} onClick={() => this.handle_time_button_click(25, posts[post_number].id)} tag={Link} to='/'>
                          <span className="last_time">25</span>
                        </Button>{' '}
                    </div>
                    <div className="nextPost">
                      <div onClick={() => this.shift_left(post_number)}>
                        <i className={`fa fa-arrow-left ${left_ok}`}></i>
                      </div>
                      <div onClick={() => this.shift_right(post_number)}>
                        <i className={`fa fa-arrow-right ${right_ok}`}></i>
                      </div>
                    </div>
                  </CardBlock>
                  <div className="done_button">
                    <Button tag={Link} to='/' color = "info" onClick={() => this.handle_done_button_click(posts[post_number].id)}><span className="done">I'm done</span></Button>
                  </div>
                </Card>
              </div>
            )
        }

        return (
            <div className='post-list'>
              <Button className="backbtn" tag={Link} to='/'>
                <img  className="backIcon" src={require('../resource/back.png')} ></img>
              </Button>
                {children}
            </div>
        );
    }
}

export default connect((state) => {
    return {
      ...state.ListPosts,
      ...state.Home,
      ...state.Mystuff,
      ...state.Music
    };
})(Mystuff);

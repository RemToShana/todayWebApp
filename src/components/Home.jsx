import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    NavLink,
    Button,
    Alert
} from 'reactstrap';
import {
    Link
} from 'react-router-dom'
import {setHomeButtonColor, setHomeTime, listPosts} from 'states/post-actions.js';

import './Home.css';

class Home extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handle_time_button_click = this.handle_time_button_click.bind(this);
        this.jump_button_click = this.jump_button_click.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(listPosts(0));
        this.props.dispatch(setHomeTime(0));
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
        const {Home_button_color, success_create} = this.props;
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
              <NavLink tag={Link} to='/create'>
                <i className="fa fa-user user-class"></i>
              </NavLink>
            </div>{
                success_create &&
                <Alert color='warning' className='success_create'>Successfully created</Alert>
            }
          </div>
        );
    }
}

export default connect((state) => {
    return {
      ...state.ListPosts,
      ...state.Home
    };
})(Home);

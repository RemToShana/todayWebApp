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
            <div className="card-container">
              <div className="setting-top">
                <Button tag={Link} to='/' color="secondary"><span className="large_back">{`<`}</span></Button>
              </div>
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
                  <NavLink tag={Link} to='/' onClick={() => this.handle_log_out()}>Log out</NavLink>
                </div>
              </div>
              <div className="setting-item-container">
                <div className="flex-display">
                  <NavLink tag={Link} to='/placeSetting'>Office & Home</NavLink>
                  <i className="fa fa-home centered" aria-hidden="true"></i>
                </div>
                <hr/>
                <div className="flex-display">
                  <NavLink tag={Link} to='/vedioGenres'>Vedio Genres</NavLink>
                  <i className="fa fa-newspaper-o centered" aria-hidden="true"></i>
                </div>
                <hr/>
                <div className="flex-display">
                  <NavLink tag={Link} to='/musicPreferences'>Music Preferences</NavLink>
                  <i className="fa fa-music centered" aria-hidden="true"></i>
                </div>
                <hr/>
                <div className="flex-display">
                  <NavLink tag={Link} to='/articleTopics'>Terms of Use</NavLink>
                  <i className="fa fa-life-ring centered" aria-hidden="true"></i>
                </div>
                <hr/>
              </div>
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

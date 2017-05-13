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
} from 'states/post-actions.js';
class Setting extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

    }

    render() {

      return (
          <div>
            <div className="card-container">
              <div className="setting-top">
                <div className="welcome">
                  <h3>Welcome,</h3>
                </div>
                <div className="username">
                  Jack
                </div>
              </div>
              <div className="setting-item-container">
                <div className="flex-display">
                  <NavLink>Office & Home</NavLink>
                  <i className="fa fa-home centered" aria-hidden="true"></i>
                </div>
                <hr/>
                <div className="flex-display">
                  <NavLink>Article Topics</NavLink>
                  <i className="fa fa-newspaper-o centered" aria-hidden="true"></i>
                </div>
                <hr/>
                <div className="flex-display">
                  <NavLink>Music Preferences</NavLink>
                  <i className="fa fa-music centered" aria-hidden="true"></i>
                </div>
                <hr/>
                <div className="flex-display">
                  <NavLink>Terms of Use</NavLink>
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
    ...state.Login
  };
})(Setting);

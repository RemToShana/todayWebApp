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
import './Login.css';
import {
  login_username, login_password,
  findAccount, login_failure,
  reset_login, set_login_password_danger,
  set_login_username_danger, account_exist
} from 'states/post-actions.js';
class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.input_username = null;
        this.input_password = null;
        this.handleUserInputChange = this.handleUserInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        // this.handleRemChecked = this.handleRemChecked.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(reset_login());
        this.props.dispatch(account_exist(false));
    }

    handleUserInputChange(e) {
        this.props.dispatch(login_username(e.target.value));
        this.props.dispatch(login_failure(false));
        this.props.dispatch(account_exist(false));
        this.props.dispatch(set_login_username_danger(""));
    }
    handlePasswordInputChange(e) {
        this.props.dispatch(login_password(e.target.value));
        this.props.dispatch(login_failure(false));
        this.props.dispatch(account_exist(false));
        this.props.dispatch(set_login_password_danger(""));
    }
    handleSignIn(login_username_value, login_password_value){
      if(!login_username_value){
        this.props.dispatch(set_login_username_danger("has-danger"));
        return
      }
      if(!login_password_value){
        this.props.dispatch(set_login_password_danger("has-danger"));
        return
      }
      this.props.dispatch(findAccount("", login_username_value, login_password_value));
    }

    render() {
      const {login_username_value, login_password_value, login_failure, username_danger, password_danger, account_exist} = this.props;
      const login_danger = login_failure ? "has-danger" : "";
      return (
          <div>
            <div className="card-container">
              <div className="login_title">
                <img src={require('../resource/title.png')} />
              </div>
              <Alert color="secondary" className={`d-flex flex-column flex-sm-row justify-content-center ${login_danger} fix ${username_danger}`}>
                <Input placeholder="Username" className="account" getRef={el => {this.input_username = el}} value={login_username_value} onChange={this.handleUserInputChange}/>
              </Alert>
              <br/>
              <Alert color="secondary" className={`d-flex flex-column flex-sm-row justify-content-center ${login_danger} ${password_danger} fix`}>
              <Input placeholder="Password" type="Password" className="account" getRef={el => {this.input_password = el}} value={login_password_value} onChange={this.handlePasswordInputChange}/>
              </Alert>
              <br/>
              <div className="sign_in_button">
                <Button color="warning"  tag={Link} to='/' onClick={() => this.handleSignIn(login_username_value, login_password_value)}>
                  <span className="sign_in">
                    SIGN IN
                  </span>
                </Button>{
                  login_failure &&
                  <Alert color='danger' className='success_create'>{`No such account >w<`} <br/> Please check it!!</Alert>
                }{
                  account_exist &&
                  <Alert color='danger' className='success_create'>{`account already exist >w<`} <br/> Please change it!!</Alert>
                }
              </div>
              <div className="or_container">
                <span className="or">
                  or
                </span>
              </div>
              <div className="fb_button">
                <Button color="primary">
                  <span className="sign_in">
                    Log in with Facebook
                  </span>
                </Button>
              </div>
              <div className="no_account_container">
                <span className="no_account">
                  Don't have an account?
                </span>
              </div>
              <div className="registor_button">
                <Button color="secondary" tag={Link} to='/registor'>
                  <span className="registor">
                    registor now
                  </span>
                </Button>
              </div>
            </div>
          </div>
      );
    }
}

export default connect((state) => {
  return {
    ...state.Login,
    ...state.Registor
  };
})(Login);

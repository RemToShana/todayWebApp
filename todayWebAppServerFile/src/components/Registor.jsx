import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    NavLink,
    Input,
    Button,
    Alert,
    Label
} from 'reactstrap';
import {
    Link
} from 'react-router-dom';
import {
  registor_username, registor_password, createAccount,
  set_password_danger, set_username_danger, reset_registor,
  createAccountSuccess
} from 'states/post-actions.js';
import './Registor.css';

class Registor extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.input_username = null;
        this.input_password = null;
        this.handleUserInputChange = this.handleUserInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handle_registor_click = this.handle_registor_click.bind(this);
    }
    handleUserInputChange(e) {
        this.props.dispatch(registor_username(e.target.value));
        if(e.target.value){
          this.props.dispatch(set_password_danger(''));
          this.props.dispatch(set_username_danger(''));
        }
    }
    handlePasswordInputChange(e) {
        this.props.dispatch(registor_password(e.target.value));
    }
    handle_registor_click(username, password){

        if(!username){
          this.props.dispatch(set_username_danger('has-danger'));
          return;
        }
        if(!password){
          this.props.dispatch(set_password_danger('has-danger'));
          return;
        }
        this.props.dispatch(createAccount(username, password));
        this.props.dispatch(createAccountSuccess(true));
    }

    render() {
      const {registor_username_value, registor_password_value, password_danger, username_danger} = this.props;
      return (
          <div>
            <div className="card-container">
              <div className="login_title">
                <h1>
                  Welcome!
                </h1>
              </div>
              <Alert color="secondary" className={`d-flex flex-column flex-sm-row justify-content-center ${username_danger} fix`}>
                <Input placeholder="Username" className="account" getRef={el => {this.input_username = el}} value={registor_username_value} onChange={this.handleUserInputChange}/>
              </Alert>
              <br/>
              <Alert color="secondary" className={`d-flex flex-column flex-sm-row justify-content-center ${password_danger} fix`}>
                <Input placeholder="Password" type="Password" className="account" getRef={el => {this.input_password = el}} value={registor_password_value} onChange={this.handlePasswordInputChange}/>
              </Alert>
              <div className="create_account_button">
                <Button color="warning" tag={Link} to='/' onClick={() => this.handle_registor_click(registor_username_value, registor_password_value)}>
                  <span className="create_account">
                    Create an account
                  </span>
                </Button>
              </div>
              <div className="or_container">
                <span className="back_to_login">
                  Or &nbsp; &nbsp; <NavLink tag={Link} to='/'>use an existing account</NavLink>
                </span>
              </div>

            </div>
          </div>
      );
    }
}

export default connect((state) => {
    return {
    ...state.Registor
    };
})(Registor);

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
import './PlaceSetting.css';
import {
  input_office_address, input_home_address, set_home_location, set_office_location,
  set_home_location_by_address, set_office_location_by_address
} from 'states/post-actions.js';


class PlaceSetting extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.input_home = null;
        this.input_office = null;
        this.handleHomeInputChange = this.handleHomeInputChange.bind(this);
        this.handleOfficeInputChange = this.handleOfficeInputChange.bind(this);
        this.place_setting_save_click = this.place_setting_save_click.bind(this);
        this.getHomeLocation = this.getHomeLocation.bind(this);
        this.getHomePosition = this.getHomePosition.bind(this);
        this.getOfficeLocation = this.getOfficeLocation.bind(this);
        this.getOfficePosition = this.getOfficePosition.bind(this);
    }

    handleHomeInputChange(e){
        this.props.dispatch(input_home_address(e.target.value));
    }

    handleOfficeInputChange(e){
        this.props.dispatch(input_office_address(e.target.value));
    }

    place_setting_save_click(home_address, office_address){
      if(home_address){
          this.props.dispatch(set_home_location_by_address(home_address));
      }
      if(office_address){
          this.props.dispatch(set_office_location_by_address(office_address));
      }
    }
    getHomeLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.getHomePosition);
      }
    }
    getHomePosition(position){
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      this.props.dispatch(set_home_location(lat, lon));
    }
    getOfficeLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.getOfficePosition);
      }
    }
    getOfficePosition(position){
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      this.props.dispatch(set_office_location(lat, lon));
    }
    render() {

      const {home_address, office_address} = this.props;

      return (
          <div>
            <Button className="backbtn" tag={Link} to='/setting'>
              <img  className="backIcon" src={require('../resource/back.png')} onClick={() => this.handle_place_button_click("home")}></img>
            </Button>
            <div className="card-container">
              <div className="top">

                <div className="home_office">Home & Office</div>
              </div>
              <div className="setting-place-container">
                <div className="setting-home">
                  <img src={require('../resource/settings_home.png')} className="settingsIcon"></img>
                  &nbsp;&nbsp;
                  Home
                </div>
                <Input className="placeholderText" placeholder="Enter address" getRef={el => {this.input_home = el}} value={home_address} onChange={this.handleHomeInputChange}/>
                <div className="place_or_container">
                  <span className="place_or">
                    or
                  </span>
                </div>
                <div className="use_current_location">
                  <i className="fa fa-location-arrow place-large" aria-hidden="true"></i>
                  &nbsp;&nbsp;
                  <Button className="location" onClick={() => this.getHomeLocation()}>Use Current Location</Button>
                </div>
                <div className="setting-home">
                  <img src={require('../resource/settings_office.png')} className="settingsIcon"></img>
                  &nbsp;&nbsp;
                  Office
                </div>
                <Input className="placeholderText" placeholder="Enter address" getRef={el => {this.input_office = el}} value={office_address} onChange={this.handleOfficeInputChange}/>
                <div className="place_or_container">
                  <span className="place_or">
                    or
                  </span>
                </div>
                <div className="use_current_location">
                  <i className="fa fa-location-arrow place-large" aria-hidden="true"></i>
                  &nbsp;&nbsp;
                  <Button className="location"  onClick={() => this.getOfficeLocation()}>Use Current Location</Button>
                </div>
              </div>
              <div className="place-button">
                <Button color="info" onClick={() => this.place_setting_save_click(home_address, office_address)} className="save_button" tag={Link} to='/setting'>
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
    ...state.Place_setting
  };
})(PlaceSetting);

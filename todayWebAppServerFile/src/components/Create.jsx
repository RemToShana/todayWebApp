import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Alert,
    Input,
    Button
} from 'reactstrap';
import { Lifecycle } from 'react-router'
import {
    Link
} from 'react-router-dom'
import moment from 'moment';
import { SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {
  createPost, setInputDanger, setTimeDanger, setDeadlineDanger,
  setPlaceDanger,setInputValue, toggleHasDeadline,
  setDeadline, setEstimateButtonColor, setDeadlineButtonColor, setClicked,
  setPlace, setEstimateTime, resetCreate, setLinkText
} from 'states/post-actions.js';
import './Create.css';

const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

class Create extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };
    static contextTypes = {
       router: React.PropTypes.object
    }
    constructor(props) {
        super(props);

        this.state = {
          focused: false
        }

        this.inputEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handle_time_button_click = this.handle_time_button_click.bind(this);
        this.handle_deadline_button_click = this.handle_deadline_button_click.bind(this);
        this.handle_toggle_button_click = this.handle_toggle_button_click.bind(this);
        this.handle_place_button_click = this.handle_place_button_click.bind(this);
        this.handle_create = this.handle_create.bind(this);
        this.handle_back_button_click = this.handle_back_button_click.bind(this);
    }

    handle_back_button_click(){
      this.props.dispatch(resetCreate());
    }

    handle_create(){
      if (!this.props.inputValue) {
          this.props.dispatch(setInputDanger(true));
          return;
      }
      if(this.props.estimate_time == -1){
        this.props.dispatch(setTimeDanger("is_true"));
        return;
      }
      if (this.props.has_deadline === true  && !this.props.deadline) {
          this.props.dispatch(setDeadlineDanger("is_true"));
          return;
      }
      if(!this.props.place){
        this.props.dispatch(setPlaceDanger("is_true"));
        return;
      }
      this.props.dispatch(createPost(this.props.place, this.props.deadline, this.props.estimate_time, this.props.inputValue, this.props.has_deadline));
      this.props.dispatch(setLinkText('/'));
      this.props.dispatch(resetCreate());
    }

    handle_place_button_click(place){
      this.props.dispatch(setPlace(place));
      this.props.dispatch(setPlaceDanger("is_false"));
      this.props.dispatch(setClicked(place));
    }

    handle_toggle_button_click(){
      this.props.dispatch(toggleHasDeadline());
    }

    handle_deadline_button_click(time){
      this.props.dispatch(setDeadline(time.toLocaleDateString('en-US')));
      this.props.dispatch(setDeadlineDanger("is_false"));
      this.props.dispatch(setDeadlineButtonColor(time));
    }

    handle_time_button_click(time){
      this.props.dispatch(setEstimateButtonColor(time));
      this.props.dispatch(setEstimateTime(time));
      this.props.dispatch(setTimeDanger("is_false"));
    }

    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(setInputValue(text));
        if (text) {
            this.props.dispatch(setInputDanger(false));
        }
    }

    render() {
        const {deadline, has_deadline, link_text, clicked, deadline_button_color ,estimate_button_color, inputValue, placeDanger, timeDanger, deadlineDanger} = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';
        console.log(this.props);
        return (
          <div>

            <Button className="backbtn" onClick={() => this.handle_back_button_click()} tag={Link} to='/'>
              <img  className="backIcon" src={require('../resource/back.png')} onClick={() => this.handle_place_button_click("home")}></img>
            </Button>

            <div className="top">
              <div className="create_event">Create Event</div>
            </div>

            <div className="input-container">
              <Alert color="secondary" className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}>
                <Input className='input' type='textarea' getRef={el => {this.inputEl = el}} value={this.props.inputValue} onChange={this.handleInputChange} placeholder="What's on your mind?"></Input>
              </Alert>
            </div>
            <div className="time-container">
              <span className="subtitle">estimated time</span>
              <br/>
              <div className="button-container">
                <Button className="timeBubble" color={`${estimate_button_color[0]}`} onClick={() => this.handle_time_button_click(5)}>
                  <span className="estimate_time">&nbsp;5&nbsp;</span>
                </Button>{' '}
                <Button className="timeBubble" color={`${estimate_button_color[1]}`} onClick={() => this.handle_time_button_click(10)}>
                  <span className="estimate_time">10</span>
                </Button>{' '}
                <Button className="timeBubble" color={`${estimate_button_color[2]}`} onClick={() => this.handle_time_button_click(15)}>
                  <span className="estimate_time">15</span>
                </Button>{' '}
                <Button className="timeBubble" color={`${estimate_button_color[3]}`} onClick={() => this.handle_time_button_click(20)}>
                  <span className="estimate_time">20</span>
                </Button>{' '}
                <Button className="timeBubble" color={`${estimate_button_color[4]}`} onClick={() => this.handle_time_button_click(25)}>
                  <span className="estimate_time">25</span>
                </Button>{' '}
              </div>
              <div className="deadline">
                <span className="subtitle">deadline</span>
                <label className="switch">
                  <input type="checkbox" onChange={() => this.handle_toggle_button_click()} defaultChecked></input>
                  <div className="slider round"></div>
                </label>
              </div>



              <div class="datePickerContainer">
                <SingleDatePicker
                  date={null} // momentPropTypes.momentObj or null
                  onDateChange={date => this.handle_deadline_button_click(date._d)} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                  placeholder={`${deadline ? deadline: "Pick a date"}`}
                />
              </div>



              <div className="place-container">
                <span className="subtitle">places</span>
                <div className="place">
                  <div className="verticle-flex">
                    <img  className="placeIcon" src={require('../resource/home.png')} onClick={() => this.handle_place_button_click("home")}></img>
                    <span className={`text-center ${clicked[0]}`} id = "places">home</span>
                  </div>
                  <div className="verticle-flex">
                    <img  className="placeIcon" src={require('../resource/office.png')} onClick={() => this.handle_place_button_click("office")}></img>
                    <span className={`text-center ${clicked[1]}`} id = "places">office</span>
                  </div>
                  <div className="verticle-flex">
                    <img  className="placeIcon" src={require('../resource/anywhere.png')} onClick={() => this.handle_place_button_click("anywhere")}></img>
                    <span className={`text-center ${clicked[2]}`} id = "places">anywhere</span>
                  </div>
                </div>
              </div>
              <div className="create_button">
                <Button className="doneBtn" color="secondary" onClick={() => this.handle_create()}>
                  <span className="deadline_month">Done</span>
                </Button>
              </div>
            </div>
          </div>
        );
    }
}

export default connect((state) => {
    return {
      ...state.Create
    };
})(Create);

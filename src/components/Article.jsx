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
import {listPosts, setMystuffButtonColor, resetTime, donePost, setMystuffPostNumber, setHomeTime} from 'states/post-actions.js';
import './Mystuff.css';
import data from './newsFeed_5min.json';

import wordcount from 'wordcount';


var length = 0;


// 5 min for 650 words, constant scale



class Article extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);


    }

    getTitle(){
      return data.title;
    }

    getContent(){
      return data.content;
    }

    componentWillMount() {

    }

    render() {
        const {HomeTime} = this.props;
        let title = this.getTitle();
        let content = this.getContent();
        let count = wordcount(content);

        console.log(this.props);
        return (
            <div >
              <h1>{title}</h1>
              <p>{content}</p>
            </div>
        );
    }
}

export default connect((state) => {
    return {
      ...state.Home,
    };
})(Article);

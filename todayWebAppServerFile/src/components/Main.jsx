import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';
import cookie from 'react-cookie';
import Home from 'components/Home.jsx';
import Mystuff from 'components/Mystuff.jsx';
import Create from 'components/Create.jsx';
import Article from 'components/Article.jsx';
import Login from 'components/Login.jsx';
import Registor from 'components/Registor.jsx';
import Setting from 'components/Setting.jsx';


// import {setSearchText} from 'states/post-actions.js';
// import {toggleNavbar} from 'states/main-actions.js';

import './Main.css';

class Main extends React.Component {

    constructor(props) {
        super(props);

        // this.searchEl = null;
        //
        // this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        // this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        // this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    render() {
        const {id} = this.props;
        let children = (
          <Login />
        );
        if(id){
          children = (
            <Home />
          );
        }
        return (
            <Router>
                <div className='main'>
                    <Route exact path="/" render={() => (
                        children
                    )}/>
                    <Route exact path="/mystuff" render={() => (
                        <Mystuff />
                    )}/>
                    <Route exact path="/create" render={() => (
                        <Create />
                    )}/>
                    <Route exact path="/article" render={() => (
                        <Article />
                    )}/>
                    <Route exact path="/registor" render={() => (
                        <Registor />
                    )}/>
                    <Route exact path="/setting" render={() => (
                        <Setting />
                    )}/>
                    {/* <div className='footer'>
                        Today
                    </div> */}
                </div>
            </Router>
        );
    }

}

export default connect(state => ({
    ...state.ListPosts,
    ...state.Main_state
}))(Main);

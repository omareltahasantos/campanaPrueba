/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router';
import './styles/app.css';
import {Home} from '../assets/js/components/Home';
import {Login} from '../assets/js/components/Login/Login';
import {Dashboard} from '../assets/js/components/Dashboard/Dashboard';



//Public route podra entrar cualquiera, mientras que private route solo los logeados 

ReactDOM.render( <Router>
    <div className="App">
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
    </div>
  </Router>, document.getElementById('root'));

import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router'
import { Redirect } from 'react-router'
import { Switch } from 'react-router';
import {Login} from '../components/Login/Login';
export function Home() {
    return (
        <BrowserRouter>
            <Redirect push to="/login" />
            <Route to="/login" component={Login} ></Route>
        </BrowserRouter>
    )
}

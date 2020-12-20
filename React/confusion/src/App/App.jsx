import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions/alert.actions';
import { PrivateRoute } from '../components/PrivateRoute';
import { Login2 } from '../components/Login2.jsx';
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { TestPage } from '../pages/TestPage'

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        /* {<div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    } }*/
                <div>
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/test" component={TestPage} />
                            <Route path="/login" component={LoginPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
                /* </div>
            </div>
        </div> */
    );
}

export { App };
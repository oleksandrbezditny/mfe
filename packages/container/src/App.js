import React, { lazy, Suspense, useState, useEffect } from 'react';
import {Router, Redirect, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import {createBrowserHistory} from 'history';
import {createGenerateClassName, StylesProvider} from "@material-ui/core";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to='/' />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};

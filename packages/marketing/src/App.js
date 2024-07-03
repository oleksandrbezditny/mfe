import React from "react";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {StylesProvider} from '@material-ui/core/styles';

import Pricing from './components/Pricing';
import Landing from './components/Landing';

export default () => {
    return (
        <div>
            <StylesProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/pricing' component={Pricing}></Route>
                        <Route path='/' component={Landing}></Route>
                    </Switch>
                </BrowserRouter>
            </StylesProvider>
        </div>
    )
}

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import SignUp from './user/Signup';
import Signin from './user/Signin';

const MainRouter = () =>(
    <div>
    <Switch>
    <Route exact path="/signin" component={Signin} />
    <Route exact path= "/signup" component={SignUp}/>
    <Route exact path="/" component={Home} />
    </Switch>
    </div>
)


export default MainRouter;
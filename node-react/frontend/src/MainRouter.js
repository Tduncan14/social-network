import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import SignUp from './user/Signup';
import Signin from './user/Signin';
import Menu from './core/Menu';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';

const MainRouter = () =>(
    <div>
    <Menu />
    <Switch>    
    <Route exact path="/user/edit/:userId" component={EditProfile} />
    <Route exact path="/signin" component={Signin} />
    <Route exact path ='/users' component ={Users}/>
    <Route exact path= "/signup" component={SignUp}/>
    <Route exact path="/" component={Home} />
    <Route exact path="/user/:userId" component ={Profile} />
    </Switch>
    </div>
)


export default MainRouter;
import React,{Component} from 'react';
import {isAuthenticated} from '../auth/index'

class Profile extends Component{

    constructor(props){
        super(props)

        this.state ={
            user:"",
            redirectToSignin:false

        }
    }

    componentDidMount(){
       console.log("user id from route params:",this.props.match.params.userId)
    }


render(){
    return (
        <div className="mt-5 mb-5"> 
           <h2>
             <p>Hello {isAuthenticated().user.name}</p>
             <p>Email {isAuthenticated().user.email}</p>
           </h2>
        </div>
    );
  }
}


export default Profile
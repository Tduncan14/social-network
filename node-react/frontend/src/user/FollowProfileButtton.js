import React,{Component} from 'react';
import {follow} from './apiUser';

class FollowProfileButton extends Component{


    followClick =()=>{
        this.props.onButtonClick(follow)
    }


    render(){


        return(
            <div className="d-inline-block mr-5"> {

              
                !this.props.following  ?( <button onClick={this.followClick} className="btn btn-success btn-raised mr-3">Follow</button>):
                (
                    <button   className="btn btn-warning btn-raised mr-3">
                    Unfollow
                   </button>
                )
            }
               
               
            </div>
        )
    }
}

export default FollowProfileButton
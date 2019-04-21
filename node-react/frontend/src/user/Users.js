import React, {Component} from 'react';
import {list} from './apiUser';

class Users extends Component {

    constructor(props){
        super(props)

        this.state = {
            users:[],
            isLoading:false
        }

    }

    componentDidMount(){
        list().then(data =>{
         if(data.error){
             console.log(data.error)
         }
         else{
             this.setState({
                 users:data
             })

             console.log(this.state.users)
         }

        });

    }

    render(){
        return(
            <div>
         <div className="container">
          <h2 className="mt-5 mt-b">
           This is a user Profile
          </h2>
         </div>  
           </div>
            )
    }





}


export default Users
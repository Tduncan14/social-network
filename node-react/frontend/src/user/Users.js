import React, {Component} from 'react';
import {list} from './apiUser';
import {Link} from 'react-router-dom';
import defaultProfile from '../images/avatar.png'
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
    renderUsers =(users) =>(
        <div className="row">
        {users.map((user,i) =>(
       <div className="card col-md-4" key={i}>
       <img className="card-img-top" src={defaultProfile} alt={user.name} style={{width:"100%;",height:"80vh;"}}/>
       <div className="card-body">
         <h5 className="card-title">{user.name}</h5>
         <p className="card-text">{user.email}.</p>
         <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary bt-sm">View Profile</Link>
       </div>
     </div>
        ))}
        </div>
     
    )

    render(){
        const {users} = this.state;
        return(
         <div className="container">
          <h2 className="mt-5 mt-b">
           This is a user Profile </h2>
          {this.renderUsers(users)}
           </div>
            )
    }





}


export default Users
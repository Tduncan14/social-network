import React,{Component} from 'react';
import {isAuthenticated} from '../auth/index'
import {Redirect,Link} from 'react-router-dom';
import {read} from './apiUser';
import defaultProfile from '../images/avatar.png';
import DeleteUser from './DeleteUser';
class Profile extends Component{

    constructor(props){
        super(props)

        this.state ={
            user:"",
            redirectToSignin:false

        }
    }


    init = (userId) =>{
    const token = isAuthenticated().token
    read(userId,token)
       .then(data =>{
           if(data.error){
           this.setState({
             redirectToSignin:true
           })
           }
           else{
             
             this.setState({user:data})
             console.log(this.state.user)
           }
       })

    }

    componentDidMount(){
      const userId = this.props.match.params.userId
      this.init(userId);
    }

    componentWillReceiveProps(props){
      const userId = props.match.params.userId;
      this.init(userId);
    }


render(){ 


      const {redirectToSignin,user} = this.state;
    
       if(redirectToSignin){
         return <Redirect to="/signin" />

       }

       const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`: defaultProfile;
      return (
 
      <div className ="container">
               < h2 className="mt-5 mb-5"> Profile </h2> 
        <div className="row">
        <div className="col-md-6">
          <img style={{height:'400px',width:'auto'}} 
            className="img-thumbnail"
            src={photoUrl} 
            alt={this.state.user.name}
            onError={i =>(i.target.src=`${defaultProfile}`)}/>
       <div className="card-body">
         <h5 className="card-title">{user.name}</h5>
         <p className="card-text">{user.email}.</p>
       </div>
        
        </div>
           <div className="col-md-6">
           <div className="lead mt-2">
      <p>Hello {user.name}</p>
             <p>Email {user.email}</p>
             <p>Date {`Joined ${new Date(user.created).toDateString()}`}</p>
      </div>
            {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id &&(
              <div className="d-inline-block">
                  <Link className="btn btn-raised btn-success mr-5 "
                   to={`/user/edit/${user._id}`}>
                    Edit Profile
                  </Link>
                  <DeleteUser userId={user._id}/>
                </div>

            )}
           </div>
           </div>
           <div className="row">
              <div className="col md-12 mt-5 mb-5">
              <hr />
                <p className="lead">{user.about}</p>
              </div>
           </div>
        </div>
    );
  }
}


export default Profile
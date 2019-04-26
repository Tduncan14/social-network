import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            filename:"",
            password: "",
            redirectToProfile: false,
            error: "",
        };
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: "",
                  
                });
            }
        });
    };

    componentDidMount() {
        this.userData = new FormData()
        const userId = this.props.match.params.userId;
        this.init(userId);

    }

 
    isvalid = () =>{
        const{name,email,password} = this.state;

        if(name.length === 0){
             this.setState({
                 error:"name is required"
             })
             return false
        }
        // validates the email with @ symbol, use a regular expression
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({
                error: "A valid Email is required",
                loading: false
            });
            return false;
        }

         if(password.length >= 1 && password.length <= 5){
             this.setState({
                 error:"password should longer than 5 letters"
             })
              return false
         }
         return true
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });

              console.log('in the handleChange method',this.state)
  
    };

    clickSubmit = event => {
        event.preventDefault();
        

        if(this.isvalid()){
            const{name,email,password} = this.state

        const user = {
            name,
            email,
            password:password || undefined
        }

    
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token,this.userData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                }
                else {
                        this.setState({
                            redirectToProfile: true
                        });
                  
                }
            });


        }

        this.setState({ loading: true });

        
        
    };

    updateForm = (name, email, password,filename) => (
        <form>

<div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
       
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>



            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update
            </button>
        </form>
    );

    render() {
        const {
            id,
            name,
            email,
            password,
            redirectToProfile,
            error,
            
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />;
        }

    
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

                <div className="alert alert-danger"
                style={{display:error ?"":"none"}}>

                {error}
                
                </div>
            
             {this.updateForm(name,email,password)}
            </div>
        );
    }
}

export default EditProfile;
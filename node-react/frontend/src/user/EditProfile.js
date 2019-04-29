import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";
import DefaultImage from "../images/avatar.png";


const imageSize ={
    width:'200px',
    height:'200px',
    borderRadius:'10px'
}

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            fileSize:0,
            password: "",
            redirectToProfile: false,
            error: "",
            loading:false
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
        const{name,email,password,fileSize} = this.state;

        if(fileSize > 200000){
            this.setState({error:"File size should be less than 1mb/100kb"});
            return false;
        }

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

    this.setState({
        error:""
    })

    const value = name === 'photo'? event.target.files[0] : event.target.value;
    
    const fileSize = name === "photo" ? event.target.files[0].size:0;

    this.userData.set(name,value);
    this.setState({[name]: value, fileSize:fileSize })
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading:true})


        if(this.isvalid()){
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

    updateForm = (name, email, password) => (
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
            loading
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />;
        }
    
        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}`: DefaultImage;
    
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

                <div className="alert alert-danger"
                style={{display:error ?"":"none"}}>

                {error}
                </div>
                {loading ? (
                    <div className="Jumbotron text-center">
                     <h2>loading...</h2>
                     </div>
                ) : (
                    ""
                )}
             <img src={photoUrl} alt={name}  style={imageSize}/>
             {this.updateForm(name,email,password)}
            </div>
        );
    }
}

export default EditProfile;
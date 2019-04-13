import React,{Component} from 'react';


class Signup extends Component {

    constructor(props){
        super(props)

        this.state={
           name:"",
           email:"",
           password:"",
           error:""
         }
    }
    handleChange=(name)=> event => {
      this.setState({
           [name]:event.target.value
      })
     }

    clickSubmit = (event) =>{
        event.preventDefault()
        const {name,email,password} = this.state;

        const user = {
            name,
            email,
            password
        }
       // console.log(user)

      // Using fetch to make a post call to backend.This sending data to create a new user
    // then you define a method with an object// easy to configure
      fetch("http://localhost:8080/signup",{
          method:"POST",
          headers:{
             Accept:"application/json",
            "Content-Type":"application/json"
          },
          body: JSON.stringify(user)
      })
        .then(response =>{
            return response.json()
        })
        .catch(err => console.log(err));

        this.setState({
          name:"",
          email:"",
          password:""
        })
     
    }


    render(){
        const {name,email,password} = this.state
        return(
            <div className="container">
           <h2 className="mt-5 mb-5">
            Sign ups
           </h2>
           <form>
           <div className="form-group">
            <label className="text-muted">Name:</label>
            <input onChange={this.handleChange("name")} className="form-control" type="text"
             value={name}/>
           </div>
           <div className="form-group">
            <label className="text-muted">Email:</label>
            <input onChange={this.handleChange("email")} className ="form-control" type="email"
             value={email}/>
           </div>
           <div className="form-group">
           <label className="text-muted">Password:</label>
           <input onChange={this.handleChange("password")} className ="form-control" type="password" 
            value={password}/>
           </div>
           <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
           </form>
            </div>
        )
    }
}

export default Signup
import React,{Component} from 'react';


class Signup extends Component {

    constructor(props){
        super(props)

        this.state={
           name:"",
           email:"",
           password:"",
           error:"",
           open:false
         }
    }
    handleChange=(name)=> event => {
      
      this.setState({
        error:""
      })

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
     
     this.signup(user)
     .then(data =>{
       if(data.error)
       this.setState({error:data.error})
       else{
         this.setState({
           error:"",
           name:"",
           email:"",
           password:"",
           open:true
         })
       }
     })
    }

    signup =(user) =>{
    return fetch("http://localhost:8080/signup",{
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
   
    }

    signupForm =(name,email,password)=>(
      
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

    )


    render(){
        const {name,email,password,error,open} = this.state
        return(
            <div className="container">
           <h2 className="mt-5 mb-5">
            Sign ups
           </h2>
         
          
          <div className="alert alert-danger"
           style={{display: error ? "":"none"}}>
          
             {error}
          </div>
           
           <div className="alert alert-info"
           style={{display:open ?"":"none"}}
           >
            Account is created , thank you
           </div>
          {this.signupForm(name,email,password)}
            </div>
        )
    }
}

export default Signup
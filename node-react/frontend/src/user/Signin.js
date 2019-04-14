import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';


class Signin extends Component {

    constructor(props){
        super(props)

      this.state ={
          
          email:"",
          password:"",
          error:"",
          redirectToReferer:false
      

      }
    }
    handleChange =(name) =>event =>{
        this.setState({
            error:""
        })

        this.setState({
            [name]:event.target.value
        })
    }

    authenticate(jwt,next){
        if(typeof window !=="undefined"){
            localStorage.setItem('jwt',JSON.stringify(jwt))
            next()
        }

    }

 clickSubmit =(event) =>{
     event.preventDefault()
     const{email,password} = this.state; 
    
     const user = {
         email,
         password
     }
     console.log(user)
     this.signin(user)
     // the data contains the json webtoken if there is no error
     .then(data =>{
         if(data.error){
         this.setState({error:data.error})
         }

         else{
            this.authenticate(data, ()=>{
                this.setState({redirectToReferer:true})
            })
             
             //authenticate the user
             // redirect
         }
         
     })
 }

 signin =(user) =>{
     return fetch("http://localhost:8080/signin",{
         method:"POST",
         headers:{
             Accept:"application/json",
             "Content-Type":"application/json"
         },
         body:JSON.stringify(user)
     })
     .then(response =>{
         return response.json()
     })
 }

 signinForm = (email,password) =>(

    <form>
    <div className="form-group">
    <label className="text-muted">email:</label>
    <input onChange={this.handleChange("email")} className="form-control" type="email"
    value={email}/>
    </div>
    <div className="form-group">
    <label className="text-muted">Password:</label>
    <input type="password" className="form-control" onChange={this.handleChange("password")} value={password} />
    </div>
  <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
  </form>
 )

 render(){

    


     const {email,password,error, redirectToReferer} = this.state;

     if(redirectToReferer){
         return <Redirect to="/"/>
     }

     return(
         <div className="container">
         
         <h2 className="mt-5 mb-5">
          SignIn
         </h2>

         <div className="alert alert-danger"
           style={{display: error ? "":"none"}}>
          
             {error}
          </div>
     {this.signinForm(email,password)}
        </div>
     )
 }
}

export default Signin
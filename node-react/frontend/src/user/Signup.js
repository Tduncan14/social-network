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

    render(){
        return(
            <div className="container">
           <h2 className="mt-5 mb-5">
            Sign ups
           </h2>
           <form>
           <div className="form-group">
            <label className="text-muted">Name:</label>
            <input onChange={this.handleChange("name")} className="form-control" type="text"
             value={this.state.name}/>
           </div>
           <div className="form-group">
            <label className="text-muted">Email:</label>
            <input onChange={this.handleChange("email")} className ="form-control" type="email"
             value={this.state.email}/>
           </div>
           <div className="form-group">
           <label className="text-muted">Password:</label>
           <input onChange={this.handleChange("password")} className ="form-control" type="password" 
            value={this.state.password}/>
           </div>
           <button className="btn btn-raised btn-primary">Submit</button>
           </form>
            </div>
        )
    }
}

export default Signup
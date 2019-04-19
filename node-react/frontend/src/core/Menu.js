import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';


const isActive = (history,path) =>{

 if(history.location.pathname === path) return {color:"#ff9900"};

 else{
    return{color:"#ffffff"}
 }

}

export const signout  = (next) =>{
  if(typeof window !== "undefined") localStorage.removeItem("jwt");
  next()
  return fetch("http://localhost:8080/signout",{
      method:"GET"
  }).then((response) =>{
      console.log('signout',response)
      return response.json();

  })
    .catch(err =>{
        console.log(err);
        return console.log(err);
    })
}






const Menu = ({history})  =>(

    <div>
       <ul className="nav nav-tabs bg-primary">
  <li className="nav-item">
    <Link  to ="/" className="nav-link " style={isActive(history,"/")} href="#">Home</Link>
  </li>
  <li className="nav-item">
    <Link to ="/signin"className="nav-link" style={isActive(history,"/signin")}href="#">Sign In</Link>
  </li>
  <li className="nav-item">
    <Link to ="/signup" className="nav-link" style={isActive(history,"/signup")} href="#">Sign up</Link>
  </li>
   <li className="nav-item"><a className ="nav-link" style={isActive(history,"/signout"),{cursor:"pointer",color:"white"}} 
    onClick={()=> signout(()=> history.push('/'))} href="#"> Sign out</a></li>
</ul>
    </div>
)


export default withRouter(Menu);
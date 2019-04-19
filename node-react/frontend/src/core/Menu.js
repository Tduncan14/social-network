import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth/index';

const isActive = (history,path) =>{

 if(history.location.pathname === path) return {color:"#ff9900"};

 else{
    return{color:"#ffffff"}
 }

}








const Menu = ({history})  =>(

    <div>
       <ul className="nav nav-tabs bg-primary">
  <li className="nav-item">
    <Link  to ="/" className="nav-link " style={isActive(history,"/")} href="#">Home</Link>
  </li>

  {!isAuthenticated()&&(<React.Fragment><li className="nav-item">
    <Link to ="/signin"className="nav-link" style={isActive(history,"/signin")}href="#">Sign In</Link>
  </li>
  <li className="nav-item">
    <Link to ="/signup" className="nav-link" style={isActive(history,"/signup")} href="#">Sign up</Link>
</li> </React.Fragment>)}

 {isAuthenticated()&&(
    <React.Fragment>
    <li className="nav-item">
    <a className="nav-link"style={isActive(history,"/signout"),{cursor : "pointer",color:"white"}} 
    onClick={()=> signout(()=> history.push('/'))} href="#ii"> Sign out 
    </a>
    </li>

 <li className="nav-item">
 <a className ="nav-link"
>{isAuthenticated().user.name}
</a>
</li>
</React.Fragment>
  )}
 </ul>
    </div>
  )


export default withRouter(Menu);
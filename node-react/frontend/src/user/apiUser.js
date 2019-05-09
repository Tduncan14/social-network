



export const list = () =>{
     return fetch(`${process.env.REACT_APP_API_URL}/users`, 
     { method:'GET'
     
     })
     .then(response => response.json())
     .catch(err => console.log(err));
}


export const remove =(userId,token)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
     method:'DELETE',
     headers:{
         Accept:"application/json",
         "Content-Type":"application/json",
         Authorization:`Bearer ${token}`
     }
   }).then(response => response.json())
   .catch(err => console.log(err));
 }
 export const read =(userId,token)=>{
 return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
    method:'GET',
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
    }
  }).then(response => response.json())
  .catch(err => console.log(err));
}


export const update = (userId, token, user) => {
  console.log("USER DATA UPDATE: ", user);
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
      },
      body: user
  })
      .then(response => {
        console.log('the photo is recieved');
          return response.json();
         
      })
      .catch(err => console.log(err));
};

// This function updates the user throught the jwt.
// it grabs and get the jwt token then reset it when a you  update the information

export const updateUser = (user,next) =>{

  if(typeof window !== 'undefined'){
    if(localStorage.getItem('jwt')){
      let auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user =user;
      localStorage.setItem('jwt',JSON.stringify(auth));
      next();
      
    }
  }
}

export const follow = (userId, token, followId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, followId })
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};
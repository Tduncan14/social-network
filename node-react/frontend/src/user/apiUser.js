



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


export const update =(userId,token,user)=>{
   console.log("User data update",user)
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
     method:'PUT',
     headers:{
         Accept:"application/json",
         Authorization:`Bearer ${token}`
     },
     body:user
   }).then(response => response.json())
   .catch(err => console.log(err));
 }
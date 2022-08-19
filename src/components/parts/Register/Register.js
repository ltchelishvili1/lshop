import React, { useEffect, useState } from 'react'

const Register = (props) => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [reppassword,setRepPassword] = useState("")
  const [num,setNum] = useState(0)
  const [count,setCount] = useState(0);

  useEffect(() => {
    fetch('https://api.storerestapi.com/auth/register',
    {
        method: 'POST',
        body: JSON.stringify({
          name: `${name}`,
          email: `${email}`,
          number: `${num}`,
          password: `${password}`,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(json => console.log(json))
  }, [count])


  return (
    <div>
<div style={{maxWidth:"600px",margin:"auto",paddingTop:"5rem"}}>
     <>
    <form >
   
    <div className="form-outline mb-4">
     <input type="text" id="frm2Example1" className="form-control" onChange={(e)=> setName(e.target.value)}/>
     <label className="form-label">name</label>
   </div>
    
   <div className="form-outline mb-4">
     <input type="email" id="form2Exmple1" className="form-control" onChange={(e)=> setEmail(e.target.value)}/>
     <label className="form-label">Email address</label>
   </div>
   <div className="form-outline mb-4">
     <input type="number" id="for2Example1" className="form-control" onChange={(e)=> setNum(e.target.value)}/>
     <label className="form-label">number</label>
   </div> 
   
    
   <div className="form-outline mb-4">
     <input type="password" id="form2xample2" className="form-control" onChange={(e)=> setPassword(e.target.value)} />
     <label className="form-label" >Password</label>
    </div>
    <div className="form-outline mb-4">
     <input type="password" id="form2Exmple1" className="form-control" onChange={(e)=> setRepPassword(e.target.value)}/>
     <label className="form-label">repeat password</label>
   </div> 
  

   
   <button type="button"  onClick={() => setCount(count+1)} className="btn btn-primary btn-block mb-4">Sign Up</button>
 
  
 </form>
   
   </> 
</div>
      
    </div>
  )
}

export default Register
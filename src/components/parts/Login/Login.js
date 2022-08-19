import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from '../Home'
const Login = (props) => {
  {/* email: 'marklyan@gmail.com',
          password: 'simple_password' */}
  const [message,setMessage] = useState("")
  const [count,setCount] = useState(0)
  const email = useRef("")
  const [qwer,setqwer] = useState([])
  const password = useRef("")
  let navigate = useNavigate();
 // const getEmail = localStorage.getItem("emailData")
  //const getPassword = localStorage.getItem("passwordData")
  useEffect(() => {
    fetch('https://api.storerestapi.com/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({
          email: `${email.current.value}`,
          password: `${password.current.value}`
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(response => response.json())
      .then(json => setMessage(json.message))
      
    {
  
  
  
   }

  }, [count])


  if (message=="Sign in success") {
    localStorage.setItem("emailData", `${email.current.value}`)
    localStorage.setItem("passwordData", `${password.current.value}`)
    localStorage.setItem("curUser", JSON.stringify(props.users.data.filter((product) => (
      product.email == `${email.current.value}`
    ))) )
    window.location.reload()
  }


  const handleSubmit = () => {
    setCount(count+1)
  }

  return (
    <div>
      { 
        props.getEmail&&props.getPassword ?
        <div>
          {navigate("/")}
          </div>:
             <div style={{maxWidth:"600px",margin:"auto",paddingTop:"5rem"}}>
       <>
       <form >
     <div className="form-outline mb-4">
       <input type="email" id="form2Example1" className="form-control" ref={email}/>
       <label className="form-label">Email address</label>
     </div>
     <div className="form-outline mb-4">
       <input type="password" id="form2Example2" className="form-control" ref={password} />
       <label className="form-label" >Password</label>
      </div>
   
   
     <div className="row mb-4">
       <div className="col d-flex justify-content-center">
   
         <div className="form-check">
           <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
           <label className="form-check-label" > Remember me </label>
         </div>
       </div>
   
       <div className="col">
      
         <a href="#!">Forgot password?</a>
       </div>
     </div>
     
     <button type="button" onClick={handleSubmit}   className="btn btn-primary btn-block mb-4">Sign in</button>
     </form>
     <div className="text-center">
       <p>Not a member? <a href="/register">Register</a></p>
       <button type="button" className="btn btn-link btn-floating mx-1">
         <i className="fab fa-facebook-f"></i>
       </button>
   
       <button type="button" className="btn btn-link btn-floating mx-1">
         <i className="fab fa-google"></i>
       </button>
   
       <button type="button" className="btn btn-link btn-floating mx-1">
         <i className="fab fa-twitter"></i>
       </button>
   
       <button type="button" className="btn btn-link btn-floating mx-1">
         <i className="fab fa-github"></i>
       </button>
     </div>
   
     
     </> 
  </div>
  
         
      }


    </div>
  );

}



export default Login
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/noimage.jpg'
import { searchContext } from '../Navbar/Navbar';
import "./Header.css"


const Header = (props) => {
  const navigate = useNavigate()
  const [address, setAddress] = useState("")
{console.log(props.data)}
  return (

    <div className="row main" >
      <div className=" leftcont fixed-top ">
        <div className="pb-4 list-group bg-light " id="list-tab" role="tablist" style={{ maxWidth: "120px" }}>
          {props.data &&
            props.data.map((x) => (
  
                <div className="container">

                <img className="card-img-top image1 pb-3 " src={x.image} alt="Card image cap" style={{ height: "70px", }} />
                <div className="middle1">
                <Link key={x.name} onClick={() => { setAddress(x.name) }} to={`/${x.name.replace(/\s+/g, '')}`}
                className=" category list-group-item list-group-item-action"
                 style={{ paddingLeft: "1rem", background: "transparent" }} 
                 id="list-home-list" data-toggle="list" role="tab" 
                 aria-controls="home"><p>{x.name.toUpperCase()}</p></Link>
                </div>
              </div>
            ))}
        </div>
        <div className=' list-group bg-light' style={{ maxWidth: "120px"}}>
          <p style={{ marginLeft: "1rem", fontSize: ".8rem" }}>Sort By Price:</p>
          <div style={{ display: "flex", marginBottom: "-1rem",marginLeft:"0.25rem" }}>
            
              <input type="number" placeholder='min' style={{ maxWidth: "50px", maxHeight: "50px" }} onChange={(e) => props.setMin(e.target.value)} />
              <span style={{ margin: "0 .3rem" }}>-</span>
              <input type="number" placeholder='max' style={{ maxWidth: "50px", maxHeight: "50px" }} onChange={(e) => props.setMax(e.target.value)} />
              
          </div>
              <button onClick={()=>props.filterByPrice()} className='btn btn-primary' style={{margin:"2rem",fontSize:"12px"}}>SORT</button>
              <div style={{display:"flex",marginTop:"-1rem",marginLeft:".2rem"}}>
              <button onClick={()=>props.sortByasc("asc")} className='btn btn-secondary' style={{fontSize:"12px",minWidth:"55px"}}>ASC</button>
              <button onClick={()=>props.sortByasc("s")} className='btn btn-secondary' style={{marginLeft:"0.2rem",fontSize:"12px"}}>DESC</button>
              </div>
        </div>
      </div>
      <div className="card-group " style={{paddingTop:"5rem", paddingLeft:"10rem", }}  >
       <>
          {address == "" ? props.searchResult.map(filteredName => (
            props.cartBody(filteredName)
          )) : props.searchResult.filter((product) => (
            product.category.name == address
          )).map(filteredName => (

            props.cartBody(filteredName)
          ))}
        </> 

      </div>
    </div>


  )
}

export default Header
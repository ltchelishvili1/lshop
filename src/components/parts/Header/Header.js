import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/noimage.jpg'
import { searchContext } from '../Navbar/Navbar';
import "./Header.css"


const Header = (props) => {
  const navigate=useNavigate()
  const [address, setAddress] = useState("")

 
  return (

    <div className="row main" >
      <div className="col-2 ">
        <div className="pb-4 list-group bg-light " id="list-tab" role="tablist" style={{ maxWidth: "120px" }}>


          {props.data &&
            props.data.map((x) => (
              <div>
                <Link key={x.name} onClick={() => { setAddress(x.name) }} to={`/${x.name.replace(/\s+/g, '')}`} className="pb-4 list-group-item list-group-item-action" style={{ paddingLeft: "1rem", background: "transparent", border: " 1px solid rgba(0, 0, 0, .05)", border: " 1px solid rgba(0, 0, 0, .05)" }} id="list-home-list" data-toggle="list" role="tab" aria-controls="home">{x.name.toUpperCase()}</Link>
              </div>
            ))}


        </div>
      </div>
      <div className="card-group " style={{ maxWidth: "1200px" }}  >
        {props.curSearch !== "" ? <>
          {address == "" ? props.searchResult.map(filteredName => (
            props.cartBody(filteredName)
          )) : props.searchResult.filter((product) => (
            product.category.name == address
          )).map(filteredName => (

            props.cartBody(filteredName)
          ))}
        </> : <>
          {address == "" ? props.data1.map(filteredName => (
            props.cartBody(filteredName)
          )) : props.data1.filter((product) => (
            product.category.name == address
          )).map(filteredName => (
            props.cartBody(filteredName)
          ))}
        </>}

      </div>
    </div>


  )
}

export default Header
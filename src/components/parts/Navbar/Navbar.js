import React, { useState, useEffect } from 'react'
import { BiLogIn,BiCart } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../Card/Card'
import { CgProfile } from "react-icons/cg"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Navbar = (props) => {
  const getUser = JSON.parse(localStorage.getItem("curUser"))
  const getCartItems = JSON.parse(localStorage.getItem("Cart1"))
  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light  fixed-top ">
      <a className="navbar-brand pr-2" href="/">LSHOP</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">

        </ul>
        <form className="form-inline my-2 my-lg-0 pr-2">
          <input onChange={(e) => props.Search(e.target.value)}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search" />

        </form>
        <a href="/cart" className='nav-link text-secondary'> <BiCart size={30} />
        {getCartItems? <span style={{color:'blue'}}>{getCartItems.length}</span>: 0}  </a>

        {props.getEmail && props.getPassword ?
          <div style={{ display: "flex", alignItems: "center" }}>
           
              <DropdownButton id="dropdown-basic-button" title={`${props.getUser[0].name}`}>
                <Dropdown.Item href={`/${getUser[0]._id}`}>Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={handleClick}>Sign Out</Dropdown.Item>
              </DropdownButton> 
          </div> :
          <a href="/login" className='nav-link text-secondary'> <BiLogIn size={30} /> </a>}

      </div>

    </nav>
  )
}

export default Navbar
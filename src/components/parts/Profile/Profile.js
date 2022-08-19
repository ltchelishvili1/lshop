import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Profile = (props) => {
   
    const getUser = JSON.parse(localStorage.getItem("curUser"))
   const navigate = useNavigate()
  return (
    <div style={{paddingTop:"5rem",maxWidth:"1400px"}} >

<div class="row py-5 ">
    <div class=" col-md-6 mx-auto">
        <div class="">
            <div class="px-4 pt-0 pb-4 bg-dark">
                <div class="media align-items-end profile-header">
                    <div class="profile mr-3"><img src="https://bootstrapious.com/i/snippets/sn-profile/teacher.jpg" 
                    alt="..." width="130" class="rounded mb-2 img-thumbnail"/><a href="#" class="btn btn-dark btn-sm btn-block">Edit profile</a></div>
                    <div class="media-body mb-5 text-white">
                        <h4 class="mt-0 mb-0">{getUser[0].name}</h4>
                        
                    </div>
                </div>
            </div>

            <div class="py-4 px-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h5 class="mb-0">Cart Items</h5>
                    <button  onClick={()=> navigate("/cart")}  class="btn btn-link text-muted">Show all</button>
                </div>
                <div class="row">
              {/*
          <div class="col-lg-6 mb-2 pr-lg-1"><img src="https://bootstrapious.com/i/snippets/sn-profile/img-3.jpg" alt="" 
                    class="img-fluid rounded shadow-sm"/></div>          
  */}
            
                
                  {props.getCartItems.map((item,index)=>{
                    return <>
                    {index<3? <>
                        <div className="container" style={{maxWidth:"200px"}}>
                    <img className="card-img-top image" src={item.images[0]} alt="Card image cap"  />
                      <div className="middle">
                       <Link to={`/itemid=${item.id}`}><button  className='btn btn-success' >See More</button> </Link>
                      </div>
                    </div>
                    </> : null}
                    </>
                  })}

                </div>
                <div class="py-4">
                    <h5 class="mb-3">Information</h5>
                    <div class="p-4 bg-light rounded shadow-sm">
                        <p class="font-italic mb-0">Role: {getUser[0].role}</p>
                        <p class="font-italic mb-0">Number : {getUser[0].number}</p>

                    </div>
                </div>
            </div>
        </div>

    </div>
</div>


    </div>
  )
}

export default Profile
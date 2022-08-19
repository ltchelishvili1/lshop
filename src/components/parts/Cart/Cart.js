import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForceUpdate } from '../../../App';
const Cart = (props) => {
  const forceUpdate = useForceUpdate()
  const getCartItems = JSON.parse(localStorage.getItem("Cart1"))
  const navigate=useNavigate()
  console.log(props.totalAmount)
  const getCartTotal = () => {
    return getCartItems
      .reduce((acc, value) => {
        return acc + value.price * value.quantity;
      }, 0)
      .toFixed(2);
  };


  function quantityChange(item, x) {
    if(x!=1&&item.quantity==1){
      props.cartItemRemove(item)
    }
else
  {  const arr = JSON.parse(localStorage.getItem("Cart1")) || []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == item.id) {
        if (x == 1) {
          arr[i].quantity = arr[i].quantity + 1
          
          localStorage.setItem("Cart1", JSON.stringify(arr))
        } else {
        
          arr[i].quantity = arr[i].quantity - 1
          item.price = item.price * item.quantity
        }
          localStorage.setItem("Cart1", JSON.stringify(arr))


      }
    }}
        forceUpdate()



  }

  return (

    <section style={{ backgroundColor: "#F8F8FF" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
           
            {getCartItems ?
            
              <>
 <p><span className="h2">Shopping Cart </span><span className="h4">({getCartItems.length} item in your cart)</span></p>
                {getCartItems.map((item) => (
                  <>
                    <div className="card mb-4" style={{ minWidth: "1200px" }}>
                      <div className="card-body p-3" >

                        <div className="" style={{ display: "flex", maxWidth: "350px" }}>
                          <div className="col-md-7">
                            <img src={item.images[0]}
                              className="img-fluid" alt="Generic placeholder image" />
                          </div>
                          <div className="col-md-3 d-flex justify-content-center">
                            <div>
                              <p className="small text-muted mb-4 pb-2">Name</p>
                              <p className="lead fw-normal mb-2">{item.title}</p>
                            </div>
                          </div>
                          <div className="col-md-3 d-flex justify-content-center">

                          </div>
                          <div className="col-md-3 d-flex justify-content-center">
                            <div>
                              <p className="small text-muted mb-4 pb-2 ">Quantity</p>
                              <div className='d-flex justify-content-center '>

                                <p onClick={() => quantityChange(item, 2)} style={{ paddingRight: "1rem", paddingTop: "0.2rem", color: "orangered", cursor: "pointer" }} >-</p>
                                <p className="lead fw-normal mb-0">{item.quantity}</p>
                                <p onClick={() => quantityChange(item, 1)} style={{ paddingLeft: "1rem", paddingTop: "0.2rem", color: "orangered", cursor: "pointer" }}>+</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 d-flex justify-content-center">
                            <div>
                              <p className="small text-muted mb-4 pb-2">Price</p>
                              <p className="lead fw-normal mb-0">{item.price * item.quantity}$</p>
                            </div>
                          </div>

                        </div>
                        <button className='btn btn-success' onClick={() => props.cartItemRemove(item)}   ><small style={{ margin: "1.5rem" }}>Remove From Cart</small></button>
                      </div>
                    </div>
                  </>
                ))}
              </>


              : <p>No Items Selected</p>
            }


            <div className="card mb-5" style={{ minWidth: "1200px" }}>
              <div className="card-body p-4">

                <div className="float-end ">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span> <span
                      className="lead pl-4 fw-normal">{getCartTotal()}$</span>
                  </p>
                </div>

              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button onClick={()=>navigate("/")} type="button" className="btn btn-light btn-lg me-2">Continue shopping</button>
              <button type="button" className="btn btn-primary btn-lg">Add to cart</button>
            </div>

          </div>
        </div>
      </div>
    </section>


  )
}
{/*



*/}
export default Cart
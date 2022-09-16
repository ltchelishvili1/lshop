import React from 'react'
import "./CartOverlay.scss"
const CartOverlay = (props) => {
  return (
    <div>

    <div className="shopping-cart">
        <div className="shopping-cart-header">
          <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">3</span>
          <div className="shopping-cart-total">
            <span className="lighter-text">Total:</span>
            <span className="main-color-text">{props.getCartTotal()}</span>
          </div>
        </div> 
    
        <ul style={{listStyleType:"none"}} className="shopping-cart-items">
          {props.getCartItems? 
          <>
          {
            props.getCartItems.map((item)=>(
              <>
               <li className="clearfix">
            <img style={{maxWidth:"80px"}} src={item.images[0]} alt="item" />
            <span className="item-name">{item.title}</span>
            <span className="item-price" style={{fontSize:"15px"}}>Price:{item.price}$</span>
            <span className="item-quantity">Quantity:<span onClick={() => props.quantityChange(item, 2)} style={{color:"orangered",padding:"0 0.3rem"}}>-</span>{item.quantity}
            <span onClick={() => props.quantityChange(item, 1)} style={{color:"orangered",padding:"0 0.3rem"}}>+</span></span>
          </li>
              </>
            ))
          }
          
          </>
          
          : null}
    
         
        </ul>
    
        <a href="/cart" style={{textDecoration:"none"}} className="button buttonSpec" >Checkout</a>
      </div> 
    
        </div>
  )
}

export default CartOverlay
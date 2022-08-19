import React, { useEffect, useState } from 'react'
import './Card.css'
const Card = (props) => {
 
  const [image,setImage] = useState(0)
  const [brightness,setBrightness] = useState(40)
  function handleImgClick(img){
    setImage(props.item.images.indexOf(img))
  }
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
        <div className="container py-5 h-100">
          <div className="h-100">
            <div  >
              <div className="card" style={{ borderRadius: "15px", width: "100" }}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      
                      <img src={props.item.images[image]} alt="Generic placeholder image" className="img-fluid"
                        style={{ maxWidth: "450px", padding: "2rem", borderRadius: " 10px" }} />
                       <div style={{display:"flex",marginLeft:"5rem"}}>
                      {
                      props.item.images.map((image)=>{
                        return<>
                        <img className='image1' src={image} onClick={() => handleImgClick(image)}  style={{ maxWidth: "80px",
                        marginRight:"1rem",cursor:"pointer"}} alt="Generic placeholder image" 
                        />
                     
                        </>
                      
                      })}
                    </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">Name: {props.item.title}</h5>
                      <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Price: {props.item.price}$</p>
                      <div className="d-flex  "
                        style={{ backgroundColor: "#efefef", flexDirection: "column", paddingtop: "1rem" }}>
                        <div>
                          <p className="small text-muted mb-1">Description</p>
                          <p className="mb-0">{props.item.description}</p>
                        </div>

                      </div>
                      <div className="d-flex pt-1" style={{ maxWidth: "140px" }}>
                        <button type="button" onClick={() => props.handleCart(props.item)} className="btn btn-outline-primary me-1 flex-grow-1">Add to Cart</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Card
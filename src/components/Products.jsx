import React, { useState, useEffect } from "react";
import axios from "axios";
import auth from "../utils/auth";
import "./products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolid, faCartShopping  } from '@fortawesome/free-solid-svg-icons'

function Products() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({
    count:0,
    price:0,
    productNames:[]
  })



  const token = auth.getToken();

  const state = auth.getUserInfo()

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

g


console.log(cart)
  const cartHandler = (e,price,name) =>{
         setCart({...cart,["count"]:cart.count + 1,["price"]:cart.price + parseInt(price),["productNames"]:cart.productNames.concat(name)})
  }

  return (
    <div className="admin">
      <div className="top">
        <div style={{width:"100%",height:"40px",display:"flex",justifyContent:"space-between",margin:"10px"}}>
          <h3>Products</h3>
          <div>
          <FontAwesomeIcon icon={faCartShopping} />&nbsp;
          <span>{cart.count}</span>
          </div>
        
        </div>
        <div style={{height:"500px",width:"100%",display:"flex",flexWrap:"wrap"}}>
        {state.map((item, index) => {
          return (
            <div key={index.toString()} className="item-box">
              <div className="image">
                <img
                  style={{ width: "80%" }}
                  src={item.productImageUrl}
                  alt="img"
                />
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <p style={{ paddingLeft: "20px",fontWeight:"600" }}>{item.productName}</p>
              <p style={{marginRight:"15px",fontWeight:"600"}}>{`Rs. ${item.productPrice}`}</p>
              </div>
              <button onClick={(e)=>{cartHandler(e,item.productPrice,item.productName)}} style={{marginLeft:"20px",borderRadius:" 10px",height:"35px",width:"220px",boxShadow:"1px solid rgba(0,0,0,0.5)",border:"none",backgroundColor:"green",color:"white"}}>Add to Cart</button>
            
            </div>
          );
        })}
        </div>
        
      </div>
    </div>
  );
}

export default Products;

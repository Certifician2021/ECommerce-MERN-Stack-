import React from "react";
import { useEffect, useState } from "react";


function Product({ closeModal, data,setCart,cart }) {
    console.log(data)
  const [formValue, setFormValue] = useState([]);
  const [noti,setNoti] = useState()

  const cartHandler = (e, price, name) => {
    setCart({
      ...cart,
      ["count"]: cart.count + 1,
      ["price"]: cart.price + parseInt(price),
      ["productNames"]: cart.productNames.concat(name),
    });
  };


  return (
    <div className="container1">
      <div className="modalContainer">
        <h3>{data.productName}</h3>
        {noti ? <h3 style={{color:"green"}}>{noti}</h3>:null}

        <div className="modalbody">
        <div style={{cursor:"pointer"}} >
              <div className="image">
                <img
                  style={{ width: "50%",height:"100%" }}
                  src={data.productImageUrl}
                  alt="img"
                />
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <p style={{ paddingLeft: "20px",fontWeight:"600" }}>{data.productName}</p>
              <p style={{marginRight:"15px",fontWeight:"600"}}>{`Rs. ${data.productPrice}`}</p>
              </div>
              <button onClick={(e)=>{cartHandler(e,data.productPrice,data.productName)}} style={{marginLeft:"20px",borderRadius:" 10px",height:"35px",width:"220px",boxShadow:"1px solid rgba(0,0,0,0.5)",border:"none",backgroundColor:"green",color:"white"}}>Add to Cart</button>
            
            </div>
         
        </div>
        <div className="footer">
          <button
            style={{
              width: "80px",
              height: "40px",
              border: "1px solid rgba(0,0,0,0.5)",
              marginLeft: "15px",
              marginTop: "10px",
            }}
            onClick={() => closeModal()}
          >
            Back
          </button>
    
        </div>
      </div>
    </div>
  );
}

export default Product;

import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import auth from '../utils/auth'

function AddProducts() {
  const [details, setDetails] = useState({
    productName : "",
    productCategory:"",
    productPrice:"",
    productImageUrl:"",
    productDescription:""
  })
  const [succesNoti,setSuccessNoti] = useState('');
  const [errorNoti, setErrorNoti] = useState('')

const token = auth.getToken();

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

  const submitHandler = async () => {
     const resp = await axios.post(`http://localhost:8080/product`,details,config)
     if(resp.data.success){
        setSuccessNoti(resp.data.message)
        setDetails({
          productName : "",
          productCategory:"",
          productPrice:"",
          productImageUrl:"",
          productDescription:""

        })
     }else{
      setErrorNoti(resp.data.message)
     }
  }

  console.log(details)

  return (
    <div className='admin' style={{flexDirection:"column"}}>
      {succesNoti ? <p style={{color:"green",fontSize:"28px"}}>{succesNoti}</p>:null}
      {errorNoti ? <p style={{color:"red",fontSize:"28px"}}>{errorNoti}</p>:null}
      <h1>Enter Product Details :</h1>
      <form style={{display:"flex",flexWrap:"wrap",flexDirection:"row"}}>
        <div style={{display:"flex",flexDirection:"column",margin:"10px"}}>
        <label style={{margin:"10px"}}>Product Name :</label>
        <input
        type="text"
        name="productName"
        value={details.productName}
        onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}
        className='input' 
        />
        </div>
        <div style={{display:"flex",flexDirection:"column",margin:"10px"}}>
        <label style={{margin:"10px"}}>Product Price :</label>
        <input
        type="text"
        name="productPrice"
        value={details.productPrice}
        onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}
        className='input' 
        />
        </div>
      
        <div style={{display:"flex",flexDirection:"column",margin:"10px"}}>
        <label style={{margin:"10px"}}>Product Description :</label>
        <input
        type="text"
        value={details.productDescription}
        name="productDescription"
        onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}
        className='input' 
        />
        </div>
        <div style={{display:"flex",flexDirection:"column",margin:"10px"}}>
        <label style={{margin:"10px"}}>Product Image :</label>
        <input
        type="text"
        className='input'
        value={details.productImageUrl}
        name="productImageUrl"
        onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} 
        />
        </div>
        <div style={{display:"flex",flexDirection:"column",margin:"10px"}}>
        <label style={{margin:"10px"}}>Product Category :</label>
        <select
        type="number"
        className='input'
        value={details.productCategory}
        name='productCategory' 
        onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}
        >
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Wooden">Wooden</option>
        </select>
        </div>
       
      </form>
      <div style={{width:"70%"}}>
      <button type="submit" onClick={(e)=>{submitHandler()}} style={{width:"80px",height:"30px",border:"1px solid rgba(0,0,0,0.5)" ,margin:"20px 0px 0px 10px"}}>Submit</button>


      </div>
    </div>
  )
}

export default AddProducts
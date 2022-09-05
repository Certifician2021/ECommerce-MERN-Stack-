import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import auth from "../../utils/auth";

function Permission({ closeModal, rowData }) {
  console.log(rowData);
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState([]);
  const [noti,setNoti] = useState()

  const token = auth.getToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  console.log(formValue)

  const fetchData = async () => {
    const resp = await axios.get(`/product`, config);
    setData(resp.data)
 
   
  };

  useEffect(() => {
    fetchData();
  },[]);

  // const changeHandler = (e) => {
  //   console.log(e.target.checked);
  // };

  const inputHandler = (e,index) => {
    if (e.target.checked) {
         const field = [...formValue]
         field.push(data[index])
         setFormValue(field)
    } else {
       const tempInfo = formValue.filter((item) => { return item.productID != data[index].productID});
        setFormValue(tempInfo);
    
    }
  };
  console.log(formValue)

  const submitRequest = async() => {
    const resp = await axios.post(`/users/permission`,{
      userID:rowData.userID,
      products:formValue
    },config)  

    if(resp.data.success){
      setNoti(resp.data.message)
    }else{
      setNoti("Error Occured. Please Try Again")
    }
    

  }

  return (
    <div className="container1">
      <div className="modalContainer">
        <h3>Product List</h3>
        {noti ? <h3 style={{color:"green"}}>{noti}</h3>:null}

        <div className="modalbody">
          <table className="table">
            <thead className="head">
              <tr>
                <th style={{ width: "10%" }}>
                  {/* <input
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    type="checkbox"
                  /> */}
                </th>
                <th>S.No.</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Category</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {data.map((item, index) => {
                return (
                  <tr>
                    <td style={{ width: "10%" }}>
                      <input
                        onClick={(e) => {
                          inputHandler(e,index);
                        }}
                        type="checkbox"
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.productID}</td>
                    <td>{item.productName}</td>
                    <td>{item.productCategory}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
            onClick={() => closeModal(false)}
          >
            Back
          </button>
          <button
            style={{
              width: "80px",
              height: "40px",
              border: "1px solid rgba(0,0,0,0.5)",
              marginLeft: "15px",
              marginTop: "10px",
            }}
            onClick={() => submitRequest()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Permission;

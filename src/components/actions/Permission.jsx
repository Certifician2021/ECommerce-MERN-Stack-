import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import {useEffect, useState} from 'react'
import axios from 'axios'
import auth from '../../utils/auth'

function Permission({ closeModal, rowData }) {

  const [data,setData] = useState([])
  const [formValue, setFormValue] = useState([])

  const token = auth.getToken(); 

  console.log(formValue)

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchData = async() =>{
    const resp = await axios.get(`http://localhost:8080/product`, config);
    setData(resp.data);
  }

  useEffect(()=>{
    fetchData();
  })

  const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
    style: { width: "50px" },
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        formValue.push(row.productID)
      }
      else {
        const tempInfo = formValue.filter((item) => { return item.productID != row.productID })
        setFormValue(tempInfo)
        return false

      }

    },
    onSelectAll: (isSelect, rows, e) => {

      if (isSelect) {
        rows.map((item, i) => formValue.push(item.productID))
      }
      else {
        setFormValue([])
        return false;
      }

    }

  };


  const columns = [
    {
      dataField: "id",
      headerAttrs: { width: "60px" },
      headerStyle: { fontWeight: '500' },
      text: "S.No.",
      formatter:(cell,row,rowIndex)=>{
          return(
              <span>{rowIndex + 1}</span>
          )
      }
    },
    {
      dataField: "productID",
      headerAttrs: { width: "50px" },
      headerStyle: { fontWeight: '500'},
      text: "Product ID",
    },
    {
      dataField: "productName",
      headerAttrs: { width: "60px" },
      headerStyle: { fontWeight: '500'},
      text: "Product Name",
    },
    {
      dataField: "productPrice",
      headerAttrs: { width: "60px" },
      headerStyle: { fontWeight: '500' },
      text: "Product Price",
    },
    {
       
        text: "Product Category",
        dataField:"productCategory",
        headerAttrs: { width: "80px" },
        headerStyle: { fontWeight: '500' },
      },
  ];

  return (
    <div className="container1">
      <div className="modalContainer">
        <h3>Product List</h3>

        <div className="body">

        <BootstrapTable
        rowClasses="row"
        wrapperClasses="table-responsive"
        keyField="id"
        selectRow={selectRowProp}
        data={data}
        columns={columns}
        rowStyle={{ border: "1px solid rgba(0,0,0,0.2)" }}
      />



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
        </div>
      </div>
    </div>
  );
}

export default Permission;

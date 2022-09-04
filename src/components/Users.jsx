import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { useState, useEffect } from 'react'
import Permission from "./actions/Permission";
import axios from 'axios'

function Users() {
    const [open, setOpen] = useState()
    const [index, setIndex] = useState(false)
    const [data,setData] = useState([])

 
    const fetchData = async() => {
      const resp = await axios.get(`/users`)
      console.log(resp)
      setData(resp.data)
    }

    useEffect(()=>{
          fetchData();
    },[])

  const setHandler = (rowIndex) => {
    setIndex(rowIndex)
    setOpen(true)
  }

  const userFormatter = (cell, row, rowIndex, formatExtraData) => {
    return(
      <p>{`${row.firstName}` + ` ` + ` ${row.lastName}`}</p>
    )
  }

  const actionFormatter = (cell, row, rowIndex,formatExtraData) => {
    return(
        <>
          <button style={{backgroundColor:"white",height:"30px",border:"1px solid rgba(0,0,0,0.2)",borderRadius:"8px",color:"blue",cursor:"pointer"}} onClick={()=>setHandler(rowIndex)}>
            Give Permission
        </button>
        {index == rowIndex && open && <Permission rowData={row} closeModal={setOpen}/>}
        </>

      
    )
  }

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
      // dataField: "name",
      headerAttrs: { width: "60px" },
      headerStyle: { fontWeight: '500'},
      text: "User Name",
      formatter:userFormatter
    },
    {
      dataField: "username",
      headerAttrs: { width: "60px" },
      headerStyle: { fontWeight: '500' },
      text: "Email ID",
    },
    {
       
        text: "Action",
        dataField:"action",
        headerAttrs: { width: "60px" },
        headerStyle: { fontWeight: '500' },
        formatExtraData:{index,setOpen,open},
        formatter:actionFormatter
      },
  ];

  return (
    <div className="admin">
      <BootstrapTable
        rowClasses="row"
        wrapperClasses="table-responsive"
        keyField="id"
        data={data}
        columns={columns}
        rowStyle={{ border: "1px solid rgba(0,0,0,0.2)" }}
      />
    </div>
  );
}

export default Users;

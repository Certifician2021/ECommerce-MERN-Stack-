import React from 'react'
import Avatar from 'react-avatar';
import logo from '../logo.svg';
import {useState} from 'react'
import PopUp from './PopUp'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from '../utils/auth'
import {useNavigate} from 'react-router-dom'



function Header() {

    const [modalOpen,setModalOpen] = useState(false)
    
    const navigate = useNavigate()
    const toggle = () => {
        setModalOpen(!modalOpen)
    }

    const token = auth.getToken()

    const submitHandler = () =>{
          auth.clearAll()
          navigate("/")
    }
  return (
    <div className="App">
      <header className="App-header" style={{justifyContent:"space-between"}}>
        <img src={logo} className="App-logo" alt="logo" />
        {
          token ? 
          <Dropdown style={{marginRight:"20px",borderRadius:"10px"}}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        User
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
        <Dropdown.Item onClick={()=>{submitHandler()}}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>:null
        }
        
   

      </header>
      </div>
  )
}

export default Header
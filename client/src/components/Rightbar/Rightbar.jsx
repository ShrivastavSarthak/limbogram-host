import React, { Fragment, useEffect, useState } from 'react'
import "./Rightbar.css"
import { Avatar, Button, IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Rightbar = () => {
  const navigate = useNavigate()
  const [userReq, setUserReq] = useState([])
  const [logout, setLogout] = useState([])
  const Logout = ()=>{
    localStorage.clear()
    navigate("/")
    
  }
  useEffect(() => {
    fetch("/timeline/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    }).then((res) => res.json()).then(data => {
      setUserReq(data)
    })
  })

  useEffect(() => {
    fetch('/getuser', {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    }).then((res) => res.json()).then((user) => {
      setLogout(user);
    })
  })

  const width = { maxWidth: "400px" }
  return (
    <Fragment >
      <div className='setvisibility card mx-5 friendCard p-2' style={width}>
        <div className='d-flex'>
          <Avatar />
          <h6 className='mt-2 ms-1'>{logout.username}</h6>
          <Button onClick={Logout} id='setButton'>Logout</Button>
        </div>
      </div>

      <div className=' setvisibility card mx-5 mt-2 friendCard p-2' style={width}>
        <h6>Suggested friends</h6>
        {
          userReq.map(person => {
            return (
              <div className='d-flex mt-2'>
                <Link className='d-flex' style={{ textDecoration: 'none' }}>
                  <Avatar />
                  <h6 className='mt-2 ms-1'>{person.username}</h6>
                </Link>
                <IconButton id='setButton' className='me-2'><PersonAddIcon /></IconButton>
              </div>
            )
          })
        }
        {
          userReq.length > 5 ? <Link to="/addfriends" >show more</Link> : null
        }

      </div>

    </Fragment>
  )
}

export default Rightbar
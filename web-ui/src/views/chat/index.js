import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { allUsersRoute } from 'constants/route.constant';

export default function Chat() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    async function fetchData() {
      if(!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate('/sign-in')
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)))
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    async function fetchData() {
      if(currentUser) {
        if(currentUser.isAvatarImageSet) {
          const data = await axios.post(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        } else {
          navigate('/avatar')
        }
      } 
    }
    fetchData();
  }, [currentUser])
  return(
    <div>
        Chat
    </div>
  )
}
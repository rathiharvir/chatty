import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import axios from 'axios';
import { allUsersRoute, host } from 'constants/route.constant';
import Contacts from './contacts';
import ChatContainer from "./chat";
import Welcome from "./welcome";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined);
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
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchData();
  }, [currentUser])

  async function fetchData() {
    if(currentUser) {
      if(currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        .catch((err) => {
          console.log(err)
        })
        if(data?.data) {
          setContacts(data.data)
        }
      } else {
        navigate('/avatar')
      }
    } 
  }
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };


  return(
    <div className="grid grid-cols-3 lg:px-48 lg:pt-24">
      <Contacts contacts={contacts} changeChat={handleChatChange} />
      {currentChat === undefined ? (
        <Welcome />
      ) : (
        <ChatContainer currentChat={currentChat} socket={socket} />
      )}
    </div>
  )
}
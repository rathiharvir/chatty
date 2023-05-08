import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./chat_input";
import Logout from "./logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "constants/route.constant";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    fetchData()
  }, [currentChat]);

  async function fetchData() {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    }).catch((err) => {
      console.log(err)
    });
    setMessages(response.data);
  }

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    }).catch((err) => {
      console.log(err)
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="col-span-2 border border-gray-300 rounded-tr-xl rounded-br-xl p-2">
      <div className="flex justify-between items-center px-0 py-1 ">
        <div className="flex items-center gap-4 ">
          <div>
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
              className="h-12"
            />
          </div>
          <div>
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="px-4 py-8 flex flex-col gap-4 overflow-auto" style={{height: '50vh'}}>
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`flex items-center ${
                  message.fromSelf ? "justify-end " : "justify-start "
                }`}
              >
                <div className={`p-2 text-base rounded-2xl bg-indigo-50 ${
                  message.fromSelf ? "rounded-br-none" : "rounded-bl-none"
                }`} style={{maxWidth: '70%', overflowWrap: 'break-word'}}>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
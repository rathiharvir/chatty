import React, { useState, useEffect } from "react";
import Logo from 'assets/logo1.png'

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  
  return(
    <>
      {currentUserImage && currentUserImage && (
        <div className="col-span-1 border border-gray-300 rounded-tl-xl rounded-bl-xl p-2 ">
          <div className="">
              <img className="h-16 w-auto" src={Logo} alt="Your Company" />
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">Chatty</h2>
          </div>
          <div className="flex flex-col items-center overflow-auto gap-3" style={{height: '50vh'}}>
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  style={{
                    minHeight: '3rem',
                    cursor: "pointer",
                    borderRadius: "0.2rem",
                    display: "flex",
                    transition: "0.5s ease-in-out"
                  }}
                  className={`w-full p-1 gap-4 items-center ${
                    index === currentSelected ? "bg-green-100" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                      className="h-14"
                    />
                  </div>
                  <div className="text-black text-base font-mono">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="flex flex-col items-center overflow-auto gap-3 ">
            <div className="bg-green-100" style={{
              minHeight: '5rem',
              cursor: "pointer",
              width: "100%",
              borderRadius: "0.2rem",
              padding: "0.4rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              transition: "0.5s ease-in-out"
            }}>
              <div>
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                  className="h-16"
                />
              </div>
              <div className="text-black">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </>
  )
}
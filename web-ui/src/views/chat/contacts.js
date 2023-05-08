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
        <div className="col-span-1">
          <div className="">
              <img className="h-24 w-auto" src={Logo} alt="Your Company" />
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">Chatty</h2>
          </div>
          <div className="flex flex-col items-center overflow-auto gap-3">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  style={{
                    minHeight: '5rem',
                    cursor: "pointer",
                    width: "90%",
                    borderRadius: "0.2rem",
                    padding: "0.4rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    transition: "0.5s ease-in-out"
                  }}
                  className={`${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                      className="h-16"
                    />
                  </div>
                  <div className="text-black">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center overflow-auto gap-3 bg-green-100">
            <div style={{
              minHeight: '5rem',
              cursor: "pointer",
              width: "90%",
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
          </div>
        </div>
      )}
    </>
  )
}
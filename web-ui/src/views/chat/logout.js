import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "constants/route.constant";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/sign-in");
    }
  };
  return (
    <button onClick={handleClick} className="flex justify-center items-center p-2 rounded-lg border-none cursor-pointer text-white bg-red-500">
      <BiPowerOff />
    </button>
  );
}

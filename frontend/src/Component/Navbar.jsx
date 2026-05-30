import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { UserContext } from "../App";
// import s from "../assets/react.svg";

function Navbar() {
  let navigate = useNavigate();
  let { guser } = useContext(UserContext);
  let isloggedin = localStorage.getItem("isloggedin");

  function handleLogout() {
    localStorage.removeItem("isloggedin");
    navigate("/Signin");
  }

  return (
    <>
      <div className="bg-black text-white shadow-md max-w-7*1 max-auto px-4 flex justify-between items-center h-16 ">
        <div class="flex item-center">
          <Link className="#" to="/">
            {/* <img src="/logo.jpeg" alt="logo" /> */}
            <img src={logo} alt="logo" class="h-10 w-10 mr-2"/>
          </Link>
        </div>
        <ul className="hidden md:flex space-x-8 text-white-700 hover:text-blue-500 border-transparent ">
          
          <li>
            <Link className="nav-link" to="/">
              View
            </Link>
          </li>

          <li>
            <Link className="nav-link" to="/Service">
              service
            </Link>
          </li>

          <li>
            <Link className="nav-link" to="/About">
              About
            </Link>
          </li>

          <li>
            <Link className="nav-link" to="/Contact">
              add Contact
            </Link>
          </li>
          <li>
            {isloggedin ? (
              <>
                <p>
                  <button onClick={handleLogout}>hi {guser.name} Logout</button>
                </p>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/Signin">
                  Signin
                </Link>
                <Link className="nav-link" to="/SignUp">
                  SignUp
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;

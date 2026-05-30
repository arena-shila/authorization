// import React from "react";
import React, { useContext, useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
let url = import.meta.env.VITE_URL;
console.log(url);

function Signin() {
  let nevigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  let { setguser } = useContext(UserContext);

  function handler(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
    // console.log(event.target.value);
  }

  async function subhandler(event) {
    event.preventDefault();
    // console.log(user);

    let res = await fetch(`${url}/signin`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await res.json();
    console.log("res", data);

    if (data.success == true) {
      localStorage.setItem("isloggedin", "true");
      localStorage.setItem("fuser", JSON.stringify(data.user));
      setguser(JSON.parse(localStorage.getItem("fuser")).name);
      nevigate("/");
    } else {
      alert(data.msg);
      localStorage.removeItem("isloggedin");
    }
  }
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <form
          onSubmit={subhandler}
          className="w-[350px] bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Signin
          </h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handler}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
          />

          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handler}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg duration-300"
          >
            LogIn
          </button>
          <br />
          <Link to="signup">Signup</Link>
        </form>
      </div>
    </>
  );
}

export default Signin;

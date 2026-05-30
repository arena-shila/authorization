// import React, { useState } from "react";
import React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
let url = import.meta.env.VITE_URL;
function SignUp() {
  let navigate = useNavigate();
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  let show = useRef();
  let showbtn = useRef();

  let showhandler = () => {
    if (showbtn.current.innerHTML == "show") {
      show.current.type = "text";
      showbtn.current.innerHTML = "hide";
      // return;
    } else {
      show.current.type = "password";
      showbtn.current.innerHTML = "show";
    }
  };

  function handler(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
    // console.log(event.target.value);
  }

  function formhandler(e) {
    e.preventDefault();
    fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/Json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("res", data);
        console.log(user);
        // localStorage.setItem("fuser", JSON.stringify(user));
        if (data.success) {
          alert(data.msg);

          navigate("/Signin");
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <form
          onSubmit={formhandler}
          autoComplete="off"
          className="w-[350px] bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">
            {" "}
            Ragistration form
          </h1>
          <label htmlFor="username" className="text-gray-700 font-medium">
            userName:
          </label>
          <input
            type="name"
            name="name"
            id="name"
            value={user.name}
            onChange={handler}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
          />{" "}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handler}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
          />{" "}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handler}
            ref={show}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
          />
          <button type="button" onClick={showhandler} ref={showbtn}>
            {" "}
            Show{" "}
          </button>
          <Link
            to="/SignUp"
            className="bg-blue-500 text-center hover:bg-blue-600 text-white font-semibold py-2 rounded-lg duration-300"
          >
            SignUp
          </Link>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

// let styles ={
//   body:{
//     display:"flex",
//     justifyContent: "center",
//     alignitem:"center",
//     height: "100vh",
//   },
//   container: {
//     background: "#06f70aff",
//     boder: "12px solid #121212ff",
//     padding: "20px",
//     borderradius: "20px",
//     height: "300px",
//     width: "500px",
//     justifyContent:"center",
//     alignitem: "center",
//   },
//   containerheading:{
//     fontsize: "1.3rem",
//     display: "flex",

//   }
// };
export default SignUp;

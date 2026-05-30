// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// import Navbar from "./Component/Navbar.css";
import React, { createContext, useState } from "react";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Card from "./Component/card";
import About from "./Component/About";
import SignUp from "./Component/SignUp";
import Signin from "./Component/SignIn";
import Contact from "./Component/Contact";
import Nopage from "./Component/Nopage";
import Service from "./Component/Service";
import Protected from "./Component/Protected";

let router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        element: (
          <>
            <Protected />
          </>
        ),
        children: [
          {
            // path: "/",
            index: true,
            element: (
              <>
                <Home />
              </>
            ),
          },

          {
            path: "/About",
            element: (
              <>
                <About />
              </>
            ),
          },

          {
            path: "/Service",
            element: (
              <>
                <Service />
              </>
            ),
          },
          {
            path: "Contact",
            element: (
              <>
                <Contact />
              </>
            ),
          },
        ],
      },
      {
        path: "/signup",
        element: (
          <>
            <SignUp />
          </>
        ),
      },
      {
        path: "/signin",
        element: (
          <>
            <Signin />
          </>
        ),
      },
      {
        path: "/*",
        element: (
          <>
            <Nopage />
          </>
        ),
      },
    ],
  },
]);

let UserContext = createContext();
function App() {
  let [guser, setguser] = useState(JSON.parse(localStorage.getItem("fuser"))||{ name: "user", email: "" });
  return (
    <>
      <UserContext.Provider value={{ guser, setguser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
      {/* <Card /> */}
    </>
  );
}

export default App;
export { UserContext };

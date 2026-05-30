import { Navigate, Outlet } from "react-router-dom";
import React from "react";

function Protected() {
  let islogin = localStorage.getItem("isloggedin");
  return (
    <>
      {islogin ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <Navigate to="/signin" />
        </>
      )}
    </>
  );
}

export default Protected;

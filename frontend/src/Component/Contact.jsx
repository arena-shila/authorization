import React, { useContext, useState } from "react";
import { UserContext } from "../App";

function Contact() {
  // let [save, satSave] = useState();

  let { guser } = useContext(UserContext);

  let [user, setUser] = useState({
    name: "",
    email: "",
    note: "",
    phone: "",
    guseremail: guser.email,
  });

  function handler(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  async function subhandler(e) {
    e.preventDefault();
    console.log(user);

    let res = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    let data = await res.json();
    console.log("res", data);
  }

  return (
    <>
      <div>
        <form onSubmit={subhandler}>
          <label htmlFor="name"> Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handler}
          />{" "}
          <br />
          <br />
          <label htmlFor="phone">Phone number:</label>
          <input
            type="number"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={handler}
          />
          <br />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handler}
          />
          <br />
          <br />
          <label htmlFor="note">Note:</label>
          <input
            type="text"
            name="note"
            id="note"
            value={user.note}
            onChange={handler}
          />
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default Contact;

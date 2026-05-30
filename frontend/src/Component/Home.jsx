import React, { useEffect, useState,useContext } from "react";
import { UserContext } from "../App";

function Home() {
  let { guser } = useContext(UserContext);
  let [contacts, setcontacts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/view", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(guser.email),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);

        setcontacts(data.data);
      });
  }, []);
  return (
    <div style={{ display: "flex" }}>
      {contacts.map((v, k) => {
        console.log(k, v);

        return (
          <div
            key={k}
            style={{ background: "red", padding: "5px", margin: "10px" }}
          >
            <p>{v.name}</p>
            <p>{v.email}</p>
            <p>{v.phone}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Home;

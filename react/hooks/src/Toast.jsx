import React, { useEffect, useState } from "react";

export const Toast = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Timer");
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    console.log("Name changed");
  }, [name]);

  useEffect(() => {
    console.log("Email changed");
  }, [email]);

  return (
    <div>
      <form
        action="#"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "200px",
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
        />
      </form>

      {/* <h1>Time: {toastTimer}</h1>
      <button
        onClick={() => {
          setToastTimer((prev) => prev - 1);
        }}
      >
        -
      </button> */}
    </div>
  );
};

import React, { useState } from "react";

const UpdateUser = () => {
  console.log("rendered");
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    age: 25,
  });

  const handleClick = () => {
    user.name = "Test User";
    user.email = "test@gmail.com";
    user.age = 1;

    setUser({ ...user });
  };
  return (
    <div>
      <h1>Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <h1>Age: {user.age}</h1>
      <button onClick={handleClick}>Change Data</button>
    </div>
  );
};

export default UpdateUser;

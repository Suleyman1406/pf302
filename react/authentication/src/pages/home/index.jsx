import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/userSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;

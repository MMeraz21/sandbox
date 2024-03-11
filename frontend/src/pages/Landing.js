import React from "react";
import { useSelector } from "react-redux";

const Landing = () => {

  const user = useSelector((state) => state.user.value)
  return (
    <div>
      <h1>Home Page</h1>
      <div>Hi {user.name} !</div>
      <div>{user.username} !</div>
    </div>
  );
};

export default Landing;

import React from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

const Feed = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to feed</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Feed;

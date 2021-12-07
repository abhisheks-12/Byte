import React, { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import UploadFile from "./UploadFile";
import { useEffect } from "react";
import { database } from "../../Firebase/Config";
import Post from "../Post/Post";

const Feed = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const unSub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unSub();
    };
  }, [user]);

  return (
    <div
      className="feed"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="comp" style={{ width: "50%" }}>
        <h1>Welcome to feed</h1>
        <button onClick={logOut}>Logout</button>
      </div>
      <UploadFile user={userData} name={"Abhishek"} />
      <Post user={userData} />
    </div>
  );
};

export default Feed;

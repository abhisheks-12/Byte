import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../Firebase/Config";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    database.users.onSnapshot((snapshot) => {
      setUserData(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  }, [id]);

  useEffect(() => {
    database.posts.onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [userData]);

  console.log(userData);

  return (
    <div>
      {posts === null || userData === null ? (
        <CircularProgress />
      ) : (
        <>
          <Navbar userData={userData} />
          <div className="spacer"></div>
          <div className="container">
            <div>
              {userData.map((user) => (
                <div className="upper_part">
                  <div className="profile_pic">
                    <img src={user.profileUrl} alt="profile" />
                  </div>
                  <div className="profile_info">
                    <Typography>Email:{user.email}</Typography>
                    <Typography>Posts:{user.pId.length}</Typography>
                  </div>
                </div>
              ))}
              <hr/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;

import { Avatar, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { database } from "../../Firebase/Config";
import Like from "../Videos/Like";
import Videos from "../Videos/Videos";
import "./Post.css";

const Post = ({ user }) => {
  const [post, setPost] = useState(null);

  // getting data from firebase
  useEffect(() => {
    const unSub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((doc) => ({
            pId: doc.id,
            ...doc.data(),
          }))
        );
      });
    return unSub;
  }, []);
  // console.log(post);

  return (
    <div>
      {post === null || user === null ? (
        <CircularProgress />
      ) : (
        <div className="video_container">
          {post.map((post, idx) => (
            <React.Fragment key={idx}>
              <div className="videos">
                {/* Imported video comp and sending data s props */}
                <Videos videoSrc={post.postUrl} />
                <div
                  className="fa"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar alt="Remy Sharp" src={user.profileUrl} />
                  <h4>{user.fullName}</h4>
                </div>
                  <Like userData={user} postData={post} className="likes" />
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;

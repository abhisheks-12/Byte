import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { database } from "../../Firebase/Config";
import Videos from "../Videos/Videos";

const Post = ({ user }) => {
  const [post, setPost] = useState(null);

  // getting data from firebase
  useEffect(() => {
    const unSub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((doc) => ({
            postId: doc.id,
            ...doc.data(),
          }))
        );
      });
    return unSub;
  }, []);
  console.log(post);

  return (
    <div>
      {post === null || user === null ? (
        <CircularProgress />
      ) : (
        <div className="video_container">
          {post.map((post, idx) => (
            <React.Fragment key={idx}>
              <div className="videos">
                <Videos videoSrc={post.postUrl} />
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;

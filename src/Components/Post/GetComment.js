import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { database } from "../../Firebase/Config";

const GetComment = ({ postData }) => {
  const [comments, setComments] = useState(null);



  useEffect(() => {
    const unSub = database.comments.onSnapshot((snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
    return unSub;
  }, [postData]);

  return (
    <div className="all_comments">
      {comments === null ? (
        <div>Loading....</div>
      ) : (
        <>
          {comments.map((comment, index) => (
            <div key={index}>
              <Avatar src={comment.userProfileImg} />{" "}
              <span className="userName">{comment.uName}:</span> {comment.text}
             
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default GetComment;

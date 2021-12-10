import { Button, Input, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { database } from "../../Firebase/Config";

const Comments = ({ userData, postData }) => {
  const [input, setInput] = React.useState("");

  console.log(postData);

  const handelClick = () => {
    const obj = {
      text: input,
      userProfileImg: userData.profileUrl,
      uName: userData.fullName,
    };
    database.comments.add(obj).then((doc) => {
      database.posts.doc(postData.pId).update({
        comments: [...postData.comments, doc.id],
      });
    });
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "10px",
      }}
    >
      <TextField
        id="standard-basic"
        label="Comments"
        variant="standard"
        value={input}
        size="small"
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <Button
        variant="contained"
        size="small"
        endIcon={<SendIcon />}
        style={{ width: "10px" }}
        onClick={handelClick}
      />
    </div>
  );
};

export default Comments;

import { Avatar, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { database } from "../../Firebase/Config";
import Like from "../Videos/Like";
import Videos from "../Videos/Videos";
import "./Post.css";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Comments from "./Comments";
import GetComment from "./GetComment";

const Post = ({ user }) => {
  const [post, setPost] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

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
                <ModeCommentIcon
                  className="commnet_box"
                  onClick={() => handleClickOpen(post.pId)}
                />
              </div>

              <div>
                {/* <Button variant="outlined">Open alert dialog</Button> */}
                <Dialog
                  open={open === post.pId}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth="true"
                  maxWidth="md"
                >
                  <div className="modal_container">
                    <div className="video_modal">
                      <Videos videoSrc={post.postUrl} className="modal_video" />
                    </div>
                    <div className="comment_modal">
                      <Card className="card1">
                        {/* Read Comments from db */}
                        <GetComment postData={post} />
                      </Card>

                      <Card style={{ padding: "10px" }}>
                        <Typography variant="body2" color="text.secondary">
                          {/* sedning data as props */}
                          <Comments userData={user} postData={post} />
                        </Typography>
                      </Card>
                    </div>
                  </div>
                </Dialog>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;

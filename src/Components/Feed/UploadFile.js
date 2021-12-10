import { Alert, Button, LinearProgress } from "@mui/material";
import React from "react";
import { useState } from "react";
import VideoFileIcon from "@mui/icons-material/VideoFile";
// import { Upload } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { database, storage } from "../../Firebase/Config";

//
function UploadFile({ user }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handelUpload = async (filename) => {
    setFile(filename);
    if (file === null) {
      setError("Please Select File First");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    if (file.size / (1024 * 1024) > 100) {
      setError("Please Upload File Less Than 20MB");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    // console.log(file);
    console.log(user.postId);

    setLoading(true);
    let uid = uuidv4();
    const upload = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    upload.on("state_changed", fn1, fn2, fn3);

    function fn1(snapshot) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} done`);
    }

    function fn2(err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }

    function fn3() {
      upload.snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);
        const userData = {
          likes: [],
          comments: [],
          postId: uid,
          postUrl: url,
          userName: user.fullName,
          userProfile: user.profileUrl,
          userId: user.userId,
          createdAt: database.getTimeStamp(),
        };

        database.posts
          .add(userData)
          .then(async (ref) => {
            await database.users.doc(user.userId).update({
              pId: user.postIds != null ? [...user.postIds, ref.id] : [ref.id],
            });
          })
          .then(() => {
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setTimeout(() => {
              setError("");
            }, 2000);
          });
      });
      setFile(null);
    }
  };

  return (
    <div>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <input
            type="file"
            accept="video/"
            id="upload_input"
            style={{ display: "none" }}
            onChange={(e) => handelUpload(e.target.files[0])}
          />
          <label htmlFor="upload_input">
            <Button
              variant="outlined"
              color="secondary"
              component="span"
              disabled={loading}
            >
              <VideoFileIcon /> Upload
            </Button>
          </label>
          {loading && (
            <LinearProgress color="secondary" style={{ marginTop: "6px" }} />
          )}
        </>
      )}
    </div>
  );
}

export default UploadFile;

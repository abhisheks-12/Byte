import * as React from "react";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./SignUp.css";
import { makeStyles } from "@mui/styles";
import { Alert, Button, CardActions, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { database, storage } from "../../Firebase/Config";
// Things I don't know as of 2018 Dan Abrammov

const SignUp = () => {
  // style hook from mui
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    card2: {
      height: "5vh",
      marginTop: "2%",
    },
  });
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  // console.log(signUp);

  const handelSignUp = async () => {
    if (password.length < 6) {
      setError("Enter password more than 6 char");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if (!file) {
      setError("Upload Profile Picture");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
      setError("");
      setLoading(true);
      const userData = await signUp(email, password);
      const uid = userData.user.uid;
      // console.log(uid);

      const upload = storage.ref(`/users/${uid}/ProfileImage`).put(file);
      upload.on("state_changed", fn1, fn2, fn3);

      function fn1(snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullName: name,
            profileUrl: url,
            createdAt: database.getTimeStamp(),
          });
        });
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
  };

  return (
    <div className="signup_wrapper">
      <div className="signup_card">
        <Card variant="outlined">
          <div className="logo_image">
            <img
              src="https://img.icons8.com/color/452/instagram-reel.png"
              alt="logo"
              style={{ width: "80px" }}
            />
          </div>
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle-1"
              component="div"
              className={classes.text1}
            >
              see amazing videos
            </Typography>
            {error !== "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              color="primary"
              size="small"
              fullWidth={true}
              variant="outlined"
              margin="dense"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              Upload Profile
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </CardContent>

          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              margin="dense"
              disable={loading}
              onClick={handelSignUp}
            >
              Sign Up
            </Button>
          </CardActions>

          <CardContent>
            <Typography className={classes.text1}>
              By signing up , you agree out terms and conditions
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <Typography className={classes.text1}>
            Already have an account?{" "}
            <Link to="/Login" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

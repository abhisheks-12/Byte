import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./Login.css";
import { makeStyles } from "@mui/styles";
import { Alert, Button, CardActions, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    text2: {
      textAlign: "center",
    },
  });
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 3000);
      setLoading(false);
    }
    return;
  };

  return (
    <div className="signup_wrapper">
      <div
        className="signup_bg_image"
        style={{
          backgroundImage: `url(
            "https://github.com/Udai1931/ReactYT/blob/master/reels/src/Assets/insta.png?raw=true"
          )`,
          backgroundSize: "cover",
          height: "590px",
          width: "441px",
        }}
      >
        <div className="card_img">
          <CarouselProvider
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            totalSlides={5}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src="https://github.com/Udai1931/ReactYT/blob/master/reels/src/Assets/img1.jpg?raw=true" />
              </Slide>
              <Slide index={1}>
                <Image src="https://github.com/Udai1931/ReactYT/blob/master/reels/src/Assets/img2.jpg?raw=true" />
              </Slide>
              <Slide index={2}>
                <Image src="https://github.com/Udai1931/ReactYT/blob/master/reels/src/Assets/img3.jpg?raw=true" />
              </Slide>
              <Slide index={3}>
                <Image src="https://github.com/Udai1931/ReactYT/blob/master/reels/src/Assets/img4.jpg?raw=true" />
              </Slide>
              <Slide index={4}>
                <Image src="https://github.com/Udai1931/ReactYT/blob/master/reels/src/Assets/img5.jpg?raw=true" />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>

      {/* card2 */}

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
            {error && <Alert severity="error"> User not found !!</Alert>}
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
          </CardContent>

          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              margin="dense"
              onClick={handelLogin}
              disable={loading}
            >
              Log In
            </Button>
          </CardActions>

          <CardContent>
            <Typography
              color="primary"
              variant="subtitle"
              className={classes.text2}
            ></Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <Typography className={classes.text1}>
            Don't have an account?{" "}
            <Link to="/signUp" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default Login;

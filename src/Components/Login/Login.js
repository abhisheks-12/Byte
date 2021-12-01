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

const Login = () => {
  const store = useContext(AuthContext);
  console.log(store);

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
            {true && (
              <Alert severity="error">
                This is an error alert — check it out!
              </Alert>
            )}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
            />
          </CardContent>

          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              margin="dense"
            >
              Log In
            </Button>
          </CardActions>

          <CardContent>
            <Typography
              color="primary"
              variant="subtitle"
              className={classes.text2}
            >
              Forgot Password ?
            </Typography>
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

import React from "react";
import "./Video.css";
import ReactDOM from "react-dom";

const Videos = ({ videoSrc }) => {
  
  
  const handelMute = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  const handelScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if (next) {
      next.scrollIntoView();
      e.target.muted = true;
    }
  };

  return (
    <>
      <video
        src={videoSrc}
        className="all_videos"
        onEnded={handelScroll}
        muted="muted"
        autoPlay
        onClick={handelMute}
        controls
      ></video>
    </>
  );
};

export default Videos;

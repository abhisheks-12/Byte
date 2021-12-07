import React from "react";

const Videos = ({ videoSrc }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <video src={videoSrc} style={{ width: "270px" }}></video>
      
    </div>
  );
};

export default Videos;

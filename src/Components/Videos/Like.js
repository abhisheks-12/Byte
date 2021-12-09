import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { database } from "../../Firebase/Config";

const Like = ({ postData, userData }) => {
  const [like, setLike] = useState(null);

  useEffect(() => {
    const check = postData.likes.includes(userData.userId) ? true : false;
    // console.log(check);
    setLike(check);
  }, [postData]);

  
  // console.log(postData.pId);

  const handelLike = () => {
    console.log("Hello World");
    if (like) {
      let tempLike = postData.likes.filter((data) => data !== userData.userId);
      database.posts.doc(postData.pId).update({
        likes: tempLike,
      });
    } else {
      let tempLike = [...postData.likes, userData.userId];
      database.posts.doc(postData.pId).update({
        likes: tempLike,
      });
      // console.log(tempLike);
    }
  };

  return (
    <div>
      {like != null ? (
        <>
          {like === true ? (
            <FavoriteIcon onClick={handelLike} className="icons_style like" />
          ) : (
            <FavoriteIcon
              onClick={handelLike}
              className="icons_style  unlike"
            />
          )}
        </>
      ) : (
        <>
          <h1>Hello</h1>
        </>
      )}
    </div>
  );
};

export default Like;

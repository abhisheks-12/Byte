import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Outlet , Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return (
    user ? <Outlet/> : <Navigate to="/login" />
  );
};

export default PrivateRoute;
